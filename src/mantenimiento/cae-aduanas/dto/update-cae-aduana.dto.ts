// src/mantenimiento/cae-aduanas/dto/update-cae-aduana.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCaeAduanaDto } from './create-cae-aduana.dto';
import { IsInt } from 'class-validator';

export class UpdateCaeAduanaDto extends PartialType(CreateCaeAduanaDto) {
    @IsInt()
    id_cae_aduana: number;
}