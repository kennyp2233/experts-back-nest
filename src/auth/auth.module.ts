import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { AuthRefreshMiddleware } from './middleware/auth-refresh.middleware';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('SECRET_KEY'),
                signOptions: { expiresIn: '15m' },
            }),
        }),
        UsuariosModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AuthRefreshMiddleware],
    exports: [AuthService, JwtModule, AuthRefreshMiddleware],
})
export class AuthModule { }