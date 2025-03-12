// src/mantenimiento/destinos/dto/create-destino.dto.ts
import { IsString, IsOptional, IsNumber, IsInt, IsBoolean } from 'class-validator';

export class CreateDestinoDto {
  @IsString()
  @IsOptional()
  codigo_destino?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  aeropuerto?: string;

  @IsInt()
  @IsOptional()
  id_pais?: number;

  @IsString()
  @IsOptional()
  sesa_id?: string;

  @IsString()
  @IsOptional()
  leyenda_fito?: string;

  @IsBoolean()
  @IsOptional()
  cobro_fitos?: boolean;
}

