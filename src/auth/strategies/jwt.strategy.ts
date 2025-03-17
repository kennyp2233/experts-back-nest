// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { RolesService } from '../../usuarios/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
        private rolesService: RolesService,
    ) {
        super({
            // Extraer token únicamente de la cookie access_token
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('SECRET_KEY'),
            passReqToCallback: true, // Importante: pasar el request al validate
        });
    }

    async validate(req: Request, payload: any) {
        const { id_usuario } = payload;
        const user = await this.prisma.usuario.findUnique({
            where: { id_usuario },
        });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        // Obtener roles actualizados de la BD
        const roles = await this.rolesService.getUserRoles(id_usuario);

        return {
            id_usuario: user.id_usuario,
            usuario: user.usuario,
            email: user.email,
            roles,
        };
    }
}