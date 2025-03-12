// src/mantenimiento/tipos-embarque/dto/update-tipo-embarque.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEmbarqueDto } from './create-tipo-embarque.dto';
import { IsInt } from 'class-validator';

export class UpdateTipoEmbarqueDto extends PartialType(CreateTipoEmbarqueDto) {
    @IsInt()
    id_tipo_embarque: number;
}