import { IsString } from 'class-validator';

export class CreateTipoCargaDto {
  @IsString()
  nombre: string;
}