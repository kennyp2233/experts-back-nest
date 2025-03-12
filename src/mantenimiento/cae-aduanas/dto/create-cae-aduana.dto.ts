// src/mantenimiento/cae-aduanas/dto/create-cae-aduana.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateCaeAduanaDto {
  @IsNumber()
  codigo_aduana: number;

  @IsString()
  nombre: string;
}

