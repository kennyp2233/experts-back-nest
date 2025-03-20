// src/documentos/centro-guias/guia-hija/dto/create-guia-hija.dto.ts
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGuiaHijaDto {
    @IsInt()
    id_documento_coordinacion: number;

    @IsInt()
    id_guia_madre: number;

    @IsInt()
    id_finca: number;

    @IsOptional()
    @IsInt()
    id_producto?: number;

    @IsString()
    numero_guia_hija: string;

    @IsInt()
    anio: number;

    @IsInt()
    secuencial: number;

    @IsOptional()
    @IsInt()
    fulls?: number;

    @IsOptional()
    @IsInt()
    pcs?: number;

    @IsOptional()
    @IsNumber()
    kgs?: number;

    @IsOptional()
    @IsInt()
    stems?: number;
}