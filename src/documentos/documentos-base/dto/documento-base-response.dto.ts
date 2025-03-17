// src/documentos/documentos-base/dto/documento-base-response.dto.ts
import { Type } from 'class-transformer';
import { GuiaMadreDto } from 'src/documentos/guia-madre/dto/guia-madre.dto';

export class DocumentoBaseResponseDto {
    id: number;
    fecha: Date;
    id_aerolinea?: number;
    id_referencia?: number;
    id_stock?: number;
    createdAt?: Date;
    updatedAt?: Date;

    @Type(() => GuiaMadreDto)
    guias_madre?: GuiaMadreDto[];

    aerolinea?: any;
    referencia?: any;
    stock?: any;
}

