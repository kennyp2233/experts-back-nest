// src/mantenimiento/bodegueros/dto/create-bodeguero.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBodegueroDto {
    @IsString()
    nombre: string;

    @IsString()
    ci: string;

    @IsString()
    clave_bodega: string;

    @IsOptional()
    @IsBoolean()
    estado: boolean;
}

