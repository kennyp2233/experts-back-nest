// src/documentos/documentos-base/dto/create-documento-base.dto.ts
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, ValidateNested } from 'class-validator';

export class CreateDocumentoBaseDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha?: Date;

    @IsOptional()
    @IsInt()
    id_aerolinea?: number;

    @IsOptional()
    @IsInt()
    id_referencia?: number; // Referencia a la AgenciaIata

    @IsOptional()
    @IsInt()
    id_stock?: number; // Referencia a DocumentoBaseStock
}

