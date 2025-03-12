
// src/mantenimiento/choferes/dto/update-chofer.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateChoferDto } from './create-chofer.dto';
import { IsInt } from 'class-validator';

export class UpdateChoferDto extends PartialType(CreateChoferDto) {
    @IsInt()
    id_chofer: number;
}