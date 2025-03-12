import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoProductoOpcionesDto } from './create-catalogo-opciones.dto';
import { IsInt } from 'class-validator';

export class UpdateCatalogoProductoOpcionesDto extends PartialType(CreateCatalogoProductoOpcionesDto) {
    @IsInt()
    id_opcion: number;
}