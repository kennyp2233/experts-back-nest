// src/usuarios/roles.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    async getUserRoles(userId: string): Promise<string[]> {
        const roles = [];

        // Verificar cada modelo de rol
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

    async isUserInRole(userId: string, role: string): Promise<boolean> {
        const roles = await this.getUserRoles(userId);
        return roles.includes(role);
    }

    async assignRole(userId: string, role: string) {
        // Verificar si el usuario existe
        const usuario = await this.prisma.usuario.findUnique({
            where: { id_usuario: userId },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        // Asignar rol según tipo
        switch (role) {
            case 'admin':
                return this.prisma.admin.create({
                    data: { id_usuario: userId },
                });
            case 'cliente':
                return this.prisma.clienteRol.create({
                    data: {
                        id_usuario: userId,
                        empresa: 'Por definir' // Requiere datos adicionales
                    },
                });
            case 'finca':
                return this.prisma.fincaRol.create({
                    data: {
                        id_usuario: userId,
                        cliente_previo: false
                    },
                });
            case 'pendiente':
                return this.prisma.pendienteRol.create({
                    data: { id_usuario: userId },
                });
            default:
                throw new NotFoundException(`Rol "${role}" no reconocido`);
        }
    }

    async removeRole(userId: string, role: string) {
        // Verificar si el usuario existe
        const usuario = await this.prisma.usuario.findUnique({
            where: { id_usuario: userId },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        // Eliminar rol según tipo
        switch (role) {
            case 'admin':
                return this.prisma.admin.delete({
                    where: { id_usuario: userId },
                });
            case 'cliente':
                return this.prisma.clienteRol.delete({
                    where: { id_usuario: userId },
                });
            case 'finca':
                return this.prisma.fincaRol.delete({
                    where: { id_usuario: userId },
                });
            case 'pendiente':
                return this.prisma.pendienteRol.delete({
                    where: { id_usuario: userId },
                });
            default:
                throw new NotFoundException(`Rol "${role}" no reconocido`);
        }
    }
}