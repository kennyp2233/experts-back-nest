// src/mantenimiento/destinos/dto/update-destino.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinoDto } from './create-destino.dto';
import { IsInt } from 'class-validator';

export class UpdateDestinoDto extends PartialType(CreateDestinoDto) {
    @IsInt()
    id_destino: number;
}

// Interfaz para datos relacionados (compatibilidad con formato anterior)
export interface DestinoRelacionado {
    paise?: { id_pais: number };
}