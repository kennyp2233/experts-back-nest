// src/mantenimiento/bodegueros/dto/update-bodeguero.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBodegueroDto } from './create-bodeguero.dto';
import { IsInt } from 'class-validator';

export class UpdateBodegueroDto extends PartialType(CreateBodegueroDto) {
    @IsInt()
    id_bodeguero: number;
}