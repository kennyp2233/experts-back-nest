
// src/documentos/centro-guias/coordinacion/dto/update-documento-coordinacion.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoCoordinacionDto } from './create-documento-coordinacion.dto';
import { IsInt } from 'class-validator';

export class UpdateDocumentoCoordinacionDto extends PartialType(CreateDocumentoCoordinacionDto) {
    @IsInt()
    id: number;
}