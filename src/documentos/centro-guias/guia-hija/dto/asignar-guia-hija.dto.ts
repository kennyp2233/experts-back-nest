// src/documentos/centro-guias/guia-hija/dto/asignar-guia-hija.dto.ts
import { IsInt } from 'class-validator';

export class AsignarGuiaHijaDto {
    @IsInt()
    id_documento_coordinacion: number;

    @IsInt()
    id_finca: number;
}
