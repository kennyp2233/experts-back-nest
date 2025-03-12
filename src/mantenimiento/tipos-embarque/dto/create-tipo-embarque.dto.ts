// src/mantenimiento/tipos-embarque/dto/create-tipo-embarque.dto.ts
import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateTipoEmbarqueDto {
    @IsString()
    @IsOptional()
    codigo_embarque?: string;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsInt()
    @IsOptional()
    id_tipo_carga?: number;

    @IsInt()
    @IsOptional()
    id_tipo_embalaje?: number;

    @IsString()
    @IsOptional()
    regimen?: string;

    @IsString()
    @IsOptional()
    mercancia?: string;

    @IsString()
    @IsOptional()
    harmonised_comidity?: string;
}

// Para mantener compatibilidad con la versión anterior
export interface TipoEmbarqueRelacionado {
    carga?: { id_tipo_carga: number };
    embalaje?: { id_tipo_embalaje: number };
}

