// src/mantenimiento/aerolineas/dto/update-aerolinea-completa.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAerolineaCompletaDto } from './create-aerolinea-completa.dto';
import { IsInt } from 'class-validator';

export class UpdateAerolineaCompletaDto extends PartialType(CreateAerolineaCompletaDto) {
    @IsInt()
    id_aerolinea: number;
}