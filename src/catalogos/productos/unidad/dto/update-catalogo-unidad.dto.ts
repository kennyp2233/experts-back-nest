import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoProductoUnidadDto } from './create-catalogo-unidad.dto';
import { IsInt } from 'class-validator';

export class UpdateCatalogoProductoUnidadDto extends PartialType(CreateCatalogoProductoUnidadDto) {
    @IsInt()
    id_medida: number;
}