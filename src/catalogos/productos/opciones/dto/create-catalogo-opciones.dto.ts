import { IsString } from 'class-validator';

export class CreateCatalogoProductoOpcionesDto {
  @IsString()
  nombre: string;
}