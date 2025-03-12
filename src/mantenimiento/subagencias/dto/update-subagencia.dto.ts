// src/mantenimiento/subagencias/dto/update-subagencia.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSubAgenciaDto } from './create-subagencia.dto';
import { IsInt } from 'class-validator';

export class UpdateSubAgenciaDto extends PartialType(CreateSubAgenciaDto) {
    @IsInt()
    id_subagencia: number;
}