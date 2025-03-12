// src/mantenimiento/paises/dto/create-pais.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePaisDto {
    @IsString()
    siglas_pais: string;

    @IsString()
    nombre: string;

    @IsNumber()
    @IsOptional()
    pais_id?: number | null;

    @IsNumber()
    @IsOptional()
    id_acuerdo?: number | null;
}

// Para mantener compatibilidad con la versión anterior
export interface PaisRelacionado {
    acuerdos_arancelario?: { id_acuerdo: number };
}
