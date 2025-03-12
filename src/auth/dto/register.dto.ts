// src/auth/dto/register.dto.ts
import { IsString, MinLength, IsEmail, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(6)
    usuario: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    pass: string;

    @IsString()
    nombre: string;

    @IsString()
    empresa: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsIn(['cliente', 'finca'])
    selectedRole: string;

    @IsString()
    @IsOptional()
    codigoFinca?: string;

    @IsString()
    @IsOptional()
    direccionFinca?: string;

    @IsBoolean()
    @IsOptional()
    clientePrevio?: boolean;
}