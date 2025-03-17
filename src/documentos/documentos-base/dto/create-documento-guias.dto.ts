// src/documentos/documentos-base/dto/create-documento-guias.dto.ts
import { IsInt, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDocumentoBaseDto } from './create-documento-base.dto';

export class CreateDocumentoGuiasDto {
    @ValidateNested()
    @Type(() => CreateDocumentoBaseDto)
    documento_base: CreateDocumentoBaseDto;

    @IsInt()
    @Min(1)
    n_guias: number;

    @IsInt()
    @Min(1)
    secuencial_inicial: number;

    @IsInt()
    @Min(1)
    prefijo: number;
}

