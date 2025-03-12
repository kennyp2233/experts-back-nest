// src/mantenimiento/origenes/dto/update-origen.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrigenDto } from './create-origen.dto';
import { IsInt } from 'class-validator';

export class UpdateOrigenDto extends PartialType(CreateOrigenDto) {
    @IsInt()
    id_origen: number;
}

// Interfaz para datos relacionados (compatibilidad con formato anterior)
export interface OrigenRelacionado {
    paise?: { id_pais: number };
    cae_aduana?: { id_cae_aduana: number };
}