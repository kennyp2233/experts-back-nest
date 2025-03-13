// src/mantenimiento/choferes/dto/create-chofer.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateChoferDto {
  @IsString()
  nombre_chofer: string;

  @IsString()
  ruc_chofer: string;

  @IsString()
  @IsOptional()
  placas_camion?: string;

  @IsString()
  @IsOptional()
  telefono_chofer?: string;

  @IsString()
  @IsOptional()
  camion?: string;

  @IsOptional()
  @IsBoolean()
  estado_chofer: boolean;
}
