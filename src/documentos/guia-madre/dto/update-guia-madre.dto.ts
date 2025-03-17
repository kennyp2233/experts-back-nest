// src/documentos/guia-madre/dto/update-guia-madre.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateGuiaMadreDto } from './create-guia-madre.dto';
import { IsInt } from 'class-validator';

export class UpdateGuiaMadreDto extends PartialType(CreateGuiaMadreDto) {
    @IsInt()
    id: number;
}
