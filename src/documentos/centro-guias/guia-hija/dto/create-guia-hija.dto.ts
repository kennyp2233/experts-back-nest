
// src/documentos/centro-guias/guia-hija/dto/create-guia-hija.dto.ts
import { IsInt, IsString } from 'class-validator';

export class CreateGuiaHijaDto {
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
}
