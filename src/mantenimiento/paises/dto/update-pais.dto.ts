
// src/mantenimiento/paises/dto/update-pais.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePaisDto } from './create-pais.dto';
import { IsInt } from 'class-validator';

export class UpdatePaisDto extends PartialType(CreatePaisDto) {
    @IsInt()
    id_pais: number;
}