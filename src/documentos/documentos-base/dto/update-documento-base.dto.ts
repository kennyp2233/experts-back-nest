// src/documentos/documentos-base/dto/update-documento-base.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoBaseDto } from './create-documento-base.dto';
import { IsInt } from 'class-validator';

export class UpdateDocumentoBaseDto extends PartialType(CreateDocumentoBaseDto) {
    @IsInt()
    id: number;
}

