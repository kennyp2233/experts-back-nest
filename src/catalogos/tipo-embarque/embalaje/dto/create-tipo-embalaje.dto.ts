import { IsString } from 'class-validator';

export class CreateTipoEmbalajeDto {
  @IsString()
  nombre: string;
}