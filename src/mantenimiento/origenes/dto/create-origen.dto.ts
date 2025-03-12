// src/mantenimiento/origenes/dto/create-origen.dto.ts
import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateOrigenDto {
    @IsString()
    @IsOptional()
    codigo_origen?: string;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    aeropuerto?: string;

    @IsInt()
    @IsOptional()
    id_pais?: number;

    @IsInt()
    @IsOptional()
    id_cae_aduana?: number;
}

