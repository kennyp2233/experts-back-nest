import { Controller, Post, Body, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const result = await this.authService.login(loginDto);

        // Configurar cookies
        response.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutos
        });

        response.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: loginDto.recordar ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 días o 1 hora
        });

        return {
            ok: true,
            msg: 'Login exitoso',
        };
    }

    @Public()
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        // Limpiar cookies
        response.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        response.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return {
            ok: true,
            msg: 'Sesión cerrada',
        };
    }

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        await this.authService.register(registerDto);
        return {
            ok: true,
            msg: 'Registro exitoso. Su cuenta está pendiente de aprobación.',
        };
    }

    @Get('me')
    async getProfile(@Req() req) {
        return {
            ok: true,
            user: req.user,
        };
    }

    @Public()
    @Post('refresh')
    async refresh(
        @Body('refresh_token') tokenFromBody: string,
        @Req() req,
        @Res({ passthrough: true }) response: Response
    ) {
        // Obtener token de body o de cookie
        const token = tokenFromBody || req.cookies.refresh_token;

        if (!token) {
            return {
                ok: false,
                msg: 'Token de refresco no proporcionado',
            };
        }

        const result = await this.authService.refreshToken(token);

        // Actualizar cookie de access token
        response.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutos
        });

        return {
            ok: true,
            msg: 'Token renovado correctamente',
        };
    }
}