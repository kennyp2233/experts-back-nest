// src/documentos/centro-guias/guia-hija/dto/asignar-guia-hija.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class AsignarGuiaHijaDto {
    @IsInt()
    id_documento_coordinacion: number;

    @IsInt()
    id_finca: number;

    @IsOptional()
    @IsInt()
    id_producto?: number;

    @IsOptional()
    @IsInt()
    fulls?: number;

    @IsOptional()
    @IsInt()
    pcs?: number;

    @IsOptional()
    @IsInt()
    kgs?: number;

    @IsOptional()
    @IsInt()
    stems?: number;
}