// src/mantenimiento/acuerdos-arancelarios/dto/create-acuerdo-arancelario.dto.ts
import { IsString } from 'class-validator';

export class CreateAcuerdoArancelarioDto {
  @IsString()
  nombre: string;
}

