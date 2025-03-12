import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoCargaDto } from './create-tipo-carga.dto';
import { IsInt } from 'class-validator';

export class UpdateTipoCargaDto extends PartialType(CreateTipoCargaDto) {
    @IsInt()
    id_tipo_carga: number;
}