import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDocumentoDto } from './create-tipo-documento.dto';
import { IsInt } from 'class-validator';

export class UpdateTipoDocumentoDto extends PartialType(CreateTipoDocumentoDto) {
    @IsInt()
    id_tipo_documento: number;
}