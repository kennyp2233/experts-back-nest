// src/usuarios/dto/create-usuario.dto.ts
import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @MinLength(6)
    usuario: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    pass: string;
}


