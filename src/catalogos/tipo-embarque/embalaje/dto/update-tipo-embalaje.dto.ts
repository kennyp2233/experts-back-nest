import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoEmbalajeDto } from './create-tipo-embalaje.dto';
import { IsInt } from 'class-validator';

export class UpdateTipoEmbalajeDto extends PartialType(CreateTipoEmbalajeDto) {
    @IsInt()
    id_tipo_embalaje: number;
}