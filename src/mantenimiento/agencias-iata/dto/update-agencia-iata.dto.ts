
// src/mantenimiento/agencias-iata/dto/update-agencia-iata.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAgenciaIataDto } from './create-agencia-iata.dto';
import { IsInt } from 'class-validator';

export class UpdateAgenciaIataDto extends PartialType(CreateAgenciaIataDto) {
    @IsInt()
    id_agencia_iata: number;
}