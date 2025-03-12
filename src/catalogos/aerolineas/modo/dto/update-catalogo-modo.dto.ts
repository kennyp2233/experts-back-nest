import { PartialType } from '@nestjs/mapped-types';
import { CreateCatalogoModoDto } from './create-catalogo-modo.dto';
import { IsInt } from 'class-validator';

export class UpdateCatalogoModoDto extends PartialType(CreateCatalogoModoDto) {
  @IsInt()
  id_modo: number;
}
