import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RolesService } from '../usuarios/roles.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private rolesService: RolesService,
    ) { }

    async login(loginDto: LoginDto) {
        const { usuario, pass, recordar } = loginDto;

        // Buscar usuario por nombre o email
        const user = await this.getUserByUsernameOrEmail(usuario);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(pass, user.pass);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Obtener roles actuales del usuario
        const roles = await this.rolesService.getUserRoles(user.id_usuario);

        // Generar tokens
        const accessToken = this.jwtService.sign(
            {
                id_usuario: user.id_usuario,
                roles,
            },
            {
                secret: this.configService.get<string>('SECRET_KEY'),
                expiresIn: '15m',
            },
        );

        const refreshToken = this.jwtService.sign(
            {
                id_usuario: user.id_usuario,
            },
            {
                secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
                expiresIn: recordar ? '7d' : '1h',
            },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async register(registerDto: RegisterDto) {
        const { usuario, email, pass, selectedRole, ...additionalData } = registerDto;

        // Validaciones
        if (!email || !usuario || !pass) {
            throw new BadRequestException('Faltan datos');
        }

        if (pass.length < 6) {
            throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
        }

        if (usuario.length < 6 || usuario.length > 20) {
            throw new BadRequestException('El usuario debe tener entre 6 y 20 caracteres');
        }

        if (usuario.includes(' ')) {
            throw new BadRequestException('El usuario no puede contener espacios');
        }

        if (!this.isEmail(email)) {
            throw new BadRequestException('El email no es válido');
        }

        // Verificar usuario existente
        const existingUser = await this.prisma.usuario.findFirst({
            where: {
                OR: [
                    { usuario },
                    { email },
                ],
            },
        });

        if (existingUser) {
            throw new BadRequestException('El usuario o correo ya existe');
        }

        // Transacción para crear usuario y roles
        return this.prisma.$transaction(async (prisma) => {
            // Hash de contraseña
            const hashedPassword = await bcrypt.hash(
                pass,
                Number(this.configService.get<string>('BY_SALT') || '10')
            );

            // Crear usuario
            const newUser = await prisma.usuario.create({
                data: {
                    usuario,
                    email,
                    pass: hashedPassword,
                },
            });

            // Asignar rol pendiente
            await prisma.pendienteRol.create({
                data: {
                    id_usuario: newUser.id_usuario,
                },
            });

            // Asignar rol específico según selección
            if (selectedRole === 'cliente') {
                await prisma.clienteRol.create({
                    data: {
                        id_usuario: newUser.id_usuario,
                        empresa: additionalData.empresa,
                    },
                });
            } else if (selectedRole === 'finca') {
                await prisma.fincaRol.create({
                    data: {
                        id_usuario: newUser.id_usuario,
                        codigo_finca: additionalData.codigoFinca,
                        direccion_finca: additionalData.direccionFinca,
                        cliente_previo: additionalData.clientePrevio || false,
                    },
                });
            }

            return { ok: true, msg: 'Usuario registrado correctamente' };
        });
    }

    async refreshToken(token: string) {
        try {
            // Verificar token de refresco
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
            });

            const { id_usuario } = payload;

            // Verificar que el usuario existe
            const user = await this.prisma.usuario.findUnique({
                where: { id_usuario },
            });

            if (!user) {
                throw new UnauthorizedException('Usuario no válido');
            }

            // Obtener roles actuales desde BD
            const roles = await this.rolesService.getUserRoles(id_usuario);

            // Generar nuevo access token con roles actualizados
            const accessToken = this.jwtService.sign(
                {
                    id_usuario,
                    roles,
                },
                {
                    secret: this.configService.get<string>('SECRET_KEY'),
                    expiresIn: '15m',
                },
            );

            return {
                accessToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Token de refresco inválido o expirado');
        }
    }

    decodeToken(token: string) {
        return this.jwtService.decode(token);
    }

    // Métodos auxiliares
    private async getUserByUsernameOrEmail(identifier: string) {
        const isEmail = this.isEmail(identifier);

        return this.prisma.usuario.findFirst({
            where: isEmail
                ? { email: identifier }
                : { usuario: identifier },
        });
    }

    private isEmail(identifier: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(identifier);
    }
}