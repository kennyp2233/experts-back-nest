// src/auth/middleware/auth-refresh.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { RolesService } from '../../usuarios/roles.service';

// Extend the Express Request interface
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

@Injectable()
export class AuthRefreshMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthRefreshMiddleware.name);

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private authService: AuthService,
        private rolesService: RolesService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.cookies?.access_token;
        const refreshToken = req.cookies?.refresh_token;

        // Si no hay tokens, continuar (podría ser una ruta pública)
        if (!accessToken && !refreshToken) {
            return next();
        }

        // Caso 1: Tenemos access token - verificarlo
        if (accessToken) {
            try {
                const payload = this.jwtService.verify(accessToken, {
                    secret: this.configService.get<string>('SECRET_KEY'),
                });

                // Obtener roles actualizados desde BD
                const roles = await this.rolesService.getUserRoles(payload.id_usuario);

                // Asignar al user con roles actualizados
                req.user = {
                    ...payload,
                    roles,
                };

                this.logger.debug(`Usuario autenticado con access token: ${payload.id_usuario}`);
                return next();
            } catch (error) {
                this.logger.debug(`Access token inválido o expirado: ${error.message}`);
                // Access token inválido - vamos a intentar usar el refresh token
                // No retornamos - continuamos con la siguiente verificación
            }
        }

        // Caso 2: No tenemos access token válido, pero sí refresh token
        if (refreshToken) {
            try {
                // Intentar renovar token
                const { accessToken: newAccessToken } = await this.authService.refreshToken(refreshToken);

                // Obtener propiedades del token para setear cookies
                const decoded = this.authService.decodeToken(newAccessToken);
                const maxAge = 15 * 60 * 1000; // 1h o 15min

                // Establecer nueva cookie
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: maxAge,
                    path: '/',
                });

                // Obtener roles actualizados
                const roles = await this.rolesService.getUserRoles(decoded.id_usuario);

                // Asignar al user
                req.user = {
                    ...decoded,
                    roles,
                };
                req.cookies.access_token = newAccessToken;
                this.logger.debug(`Token refrescado exitosamente para usuario: ${decoded.id_usuario}`);
                return next();
            } catch (refreshError) {
                this.logger.error(`Error al refrescar token: ${refreshError.message}`);

                // Error en refresh token, limpiar cookies
                res.clearCookie('access_token', { path: '/' });
                res.clearCookie('refresh_token', { path: '/' });
            }
        }

        // No hay token válido, continuamos sin asignar usuario
        next();
    }
}