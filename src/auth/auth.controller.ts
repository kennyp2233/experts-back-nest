// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        return {
            ok: true,
            msg: 'Login exitoso',
            ...result,
        };
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const result = await this.authService.register(registerDto);
        return {
            ok: true,
            msg: 'Registro exitoso. Su cuenta está pendiente de aprobación.',
        };
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        const result = await this.authService.refreshToken(refreshToken);
        return {
            ok: true,
            ...result,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req) {
        return {
            ok: true,
            user: req.user,
        };
    }
}