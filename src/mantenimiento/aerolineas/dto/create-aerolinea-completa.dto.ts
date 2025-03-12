// src/mantenimiento/aerolineas/dto/create-aerolinea-completa.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateAerolineaDto } from './create-aerolinea.dto';
import { CreateAerolineaPlantillaDto } from './create-aerolinea-plantilla.dto';

export class CreateAerolineaCompletaDto {
    @ValidateNested()
    @Type(() => CreateAerolineaDto)
    aerolinea: CreateAerolineaDto;

    @ValidateNested()
    @Type(() => CreateAerolineaPlantillaDto)
    plantilla: CreateAerolineaPlantillaDto;
}