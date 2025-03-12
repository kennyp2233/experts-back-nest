// src/mantenimiento/embarcadores/dto/create-embarcador.dto.ts
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateEmbarcadorDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  ci?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  ciudad?: string;

  @IsString()
  @IsOptional()
  provincia?: string;

  @IsString()
  @IsOptional()
  pais?: string;

  @IsString()
  @IsOptional()
  embarcador_codigo_pais?: string;

  @IsNumber()
  @IsOptional()
  handling?: number;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}

