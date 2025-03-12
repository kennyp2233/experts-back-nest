// src/auth/dto/login.dto.ts
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    usuario: string;

    @IsString()
    @MinLength(6)
    pass: string;

    @IsString()
    recordar?: boolean = false;
}

