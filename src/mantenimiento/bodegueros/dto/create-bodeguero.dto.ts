// src/mantenimiento/bodegueros/dto/create-bodeguero.dto.ts
import { IsString, IsBoolean } from 'class-validator';

export class CreateBodegueroDto {
    @IsString()
    nombre: string;

    @IsString()
    ci: string;

    @IsString()
    clave_bodega: string;

    @IsBoolean()
    estado: boolean;
}

