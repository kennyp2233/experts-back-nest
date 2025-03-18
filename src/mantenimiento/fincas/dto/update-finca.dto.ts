// src/mantenimiento/fincas/dto/update-finca.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateFincaDto } from './create-finca.dto';

export class UpdateFincaDto extends PartialType(CreateFincaDto) {
    @IsInt()
    id_finca: number;
}