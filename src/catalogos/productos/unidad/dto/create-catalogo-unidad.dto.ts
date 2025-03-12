import { IsString } from 'class-validator';

export class CreateCatalogoProductoUnidadDto {
  @IsString()
  nombre: string;
}