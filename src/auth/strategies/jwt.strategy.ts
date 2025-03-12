// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('SECRET_KEY'),
        });
    }

    async validate(payload: any) {
        const { id_usuario } = payload;
        const user = await this.prisma.usuario.findUnique({
            where: { id_usuario },
        });

        if (!user) {
            return null;
        }

        // Get user roles
        const roles = await this.getUserRoles(id_usuario);

        return {
            id_usuario: user.id_usuario,
            usuario: user.usuario,
            email: user.email,
            roles,
        };
    }

    private async getUserRoles(userId: string): Promise<string[]> {
        const roles = [];

        // Check each role model
        const admin = await this.prisma.admin.findUnique({
            where: { id_usuario: userId },
        });
        if (admin) roles.push('admin');

        const cliente = await this.prisma.clienteRol.findUnique({
            where: { id_usuario: userId },
        });
        if (cliente) roles.push('cliente');

        const finca = await this.prisma.fincaRol.findUnique({
            where: { id_usuario: userId },
        });
        if (finca) roles.push('finca');

        const pendiente = await this.prisma.pendienteRol.findUnique({
            where: { id_usuario: userId },
        });
        if (pendiente) roles.push('pendiente');

        return roles;
    }
}