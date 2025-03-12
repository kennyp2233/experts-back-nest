// src/mantenimiento/acuerdos-arancelarios/dto/update-acuerdo-arancelario.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAcuerdoArancelarioDto } from './create-acuerdo-arancelario.dto';
import { IsInt } from 'class-validator';

export class UpdateAcuerdoArancelarioDto extends PartialType(CreateAcuerdoArancelarioDto) {
  @IsInt()
  id_acuerdo: number;
}