// src/documentos/guia-madre/dto/prestar-guia-madre.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class PrestarGuiaMadreDto {
    @IsOptional()
    @IsString()
    observaciones?: string;
}