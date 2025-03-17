// src/documentos/centro-guias/guia-hija/dto/guia-hija.dto.ts
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GuiaHijaDto {
    @IsInt()
    id: number;

    @IsInt()
    id_documento_coordinacion: number;

    @IsInt()
    id_guia_madre: number;

    @IsInt()
    id_finca: number;

    @IsString()
    numero_guia_hija: string;

    @IsInt()
    anio: number;

    @IsInt()
    secuencial: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;
}


