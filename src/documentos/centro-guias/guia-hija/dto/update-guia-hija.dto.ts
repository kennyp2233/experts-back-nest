// src/documentos/centro-guias/guia-hija/dto/update-guia-hija.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateGuiaHijaDto } from './create-guia-hija.dto';
import { IsInt } from 'class-validator';

export class UpdateGuiaHijaDto extends PartialType(CreateGuiaHijaDto) {
    @IsInt()
    id: number;
}
