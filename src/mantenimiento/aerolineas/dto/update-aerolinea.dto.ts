// src/mantenimiento/aerolineas/dto/update-aerolinea.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAerolineaDto } from './create-aerolinea.dto';
import { IsInt } from 'class-validator';

export class UpdateAerolineaDto extends PartialType(CreateAerolineaDto) {
    @IsInt()
    id_aerolinea: number;
}