// src/auth/dto/login.dto.ts
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    usuario: string;

    @IsString()
    @MinLength(6)
    pass: string;

    @IsBoolean()
    recordar?: boolean = false;
}

