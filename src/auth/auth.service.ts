// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async login(loginDto: LoginDto) {
        const { usuario, pass, recordar } = loginDto;

        // Find user by username or email
        const user = await this.getUserByUsernameOrEmail(usuario);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(pass, user.pass);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Get user roles
        const roles = await this.getUserRoles(user.id_usuario);

        // Generate tokens
        const accessToken = this.generateAccessToken(user.id_usuario, roles);
        const refreshToken = this.generateRefreshToken(user.id_usuario, recordar);

        return {
            accessToken,
            refreshToken,
        };
    }

    async register(registerDto: RegisterDto) {
        const { usuario, email, pass, selectedRole, ...additionalData } = registerDto;

        // Validate inputs
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

        // Check for existing user
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

        // Create transaction
        return this.prisma.$transaction(async (prisma) => {
            // Hash password
            const hashedPassword = await bcrypt.hash(
                pass,
                Number(this.configService.get<string>('BY_SALT') || '10')
            );

            // Create user
            const newUser = await prisma.usuario.create({
                data: {
                    usuario,
                    email,
                    pass: hashedPassword,
                },
            });

            // Assign pending role
            await prisma.pendienteRol.create({
                data: {
                    id_usuario: newUser.id_usuario,
                },
            });

            // Assign specific role
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
            const payload = this.jwtService.verify(
                token,
                { secret: this.configService.get<string>('SECRET_REFRESH_KEY') }
            );

            const { id_usuario } = payload;
            const user = await this.prisma.usuario.findUnique({
                where: { id_usuario },
            });

            if (!user) {
                throw new UnauthorizedException('Usuario no válido');
            }

            const roles = await this.getUserRoles(id_usuario);

            // Generate new access token
            const newAccessToken = this.generateAccessToken(id_usuario, roles);

            return {
                accessToken: newAccessToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Token de refresco inválido');
        }
    }

    async getUserByUsernameOrEmail(identifier: string) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        return this.prisma.usuario.findFirst({
            where: isEmail
                ? { email: identifier }
                : { usuario: identifier },
        });
    }

    async getUserRoles(userId: string): Promise<string[]> {
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

    private generateAccessToken(userId: string, roles: string[]): string {
        return this.jwtService.sign(
            {
                id_usuario: userId,
                roles,
            },
            {
                secret: this.configService.get<string>('SECRET_KEY'),
                expiresIn: '15m',
            },
        );
    }

    private generateRefreshToken(userId: string, rememberMe: boolean): string {
        return this.jwtService.sign(
            {
                id_usuario: userId,
            },
            {
                secret: this.configService.get<string>('SECRET_REFRESH_KEY'),
                expiresIn: rememberMe ? '7d' : '1h',
            },
        );
    }
}