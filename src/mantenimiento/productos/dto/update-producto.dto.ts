
// src/mantenimiento/productos/dto/update-producto.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsInt()
    id_producto: number;
}