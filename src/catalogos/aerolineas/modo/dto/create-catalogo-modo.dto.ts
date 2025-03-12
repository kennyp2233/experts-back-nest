import { IsString } from 'class-validator';

export class CreateCatalogoModoDto {
  @IsString()
  nombre: string;
}
