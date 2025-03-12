// src/mantenimiento/embarcadores/dto/update-embarcador.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmbarcadorDto } from './create-embarcador.dto';
import { IsInt } from 'class-validator';

export class UpdateEmbarcadorDto extends PartialType(CreateEmbarcadorDto) {
    @IsInt()
    id_embarcador: number;
}