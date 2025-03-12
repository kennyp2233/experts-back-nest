import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
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

        try {
            // Verificar si el access token es válido
            if (accessToken) {
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

                return next();
            }
        } catch (error) {
            // Error en access token, intentar renovar si hay refresh token
            if (!refreshToken) {
                return next();
            }

            try {
                // Intentar renovar token
                const { accessToken: newAccessToken } = await this.authService.refreshToken(refreshToken);

                // Establecer nueva cookie
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000,
                });

                // Decodificar el nuevo token
                const newPayload = this.authService.decodeToken(newAccessToken);

                // Obtener roles actualizados
                const roles = await this.rolesService.getUserRoles(newPayload.id_usuario);

                // Asignar al user
                req.user = {
                    ...newPayload,
                    roles,
                };
            } catch (refreshError) {
                // Error en refresh token, limpiar cookies
                res.clearCookie('access_token');
                res.clearCookie('refresh_token');
            }
        }

        next();
    }
}