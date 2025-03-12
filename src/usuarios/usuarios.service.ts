// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) { }

    async findAll() {
        return this.prisma.usuario.findMany();
    }

    async findOne(id: string) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id_usuario: id },
        });

        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        return usuario;
    }

    async findByUsername(username: string) {
        return this.prisma.usuario.findFirst({
            where: { usuario: username },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.usuario.findFirst({
            where: { email },
        });
    }

    async create(createUsuarioDto: CreateUsuarioDto) {
        const { usuario, email, pass } = createUsuarioDto;

        // Verificar si el usuario ya existe
        const existingUser = await this.prisma.usuario.findFirst({
            where: {
                OR: [
                    { usuario },
                    { email },
                ],
            },
        });

        if (existingUser) {
            throw new BadRequestException('El nombre de usuario o correo ya existe');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(
            pass,
            Number(this.configService.get('BY_SALT') || '10')
        );

        // Crear usuario
        return this.prisma.usuario.create({
            data: {
                usuario,
                email,
                pass: hashedPassword,
            },
        });
    }

    async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
        // Verificar si el usuario existe
        await this.findOne(id);

        const data: any = { ...updateUsuarioDto };

        // Si se actualiza la contraseña, hashearla
        if (data.pass) {
            data.pass = await bcrypt.hash(
                data.pass,
                Number(this.configService.get('BY_SALT') || '10')
            );
        }

        return this.prisma.usuario.update({
            where: { id_usuario: id },
            data,
        });
    }

    async remove(id: string) {
        // Verificar si el usuario existe
        await this.findOne(id);

        return this.prisma.usuario.delete({
            where: { id_usuario: id },
        });
    }
}

