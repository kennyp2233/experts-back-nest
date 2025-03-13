// src/mantenimiento/subagencias/dto/create-subagencia.dto.ts
import { IsString, IsNumber, IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class CreateSubAgenciaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  ci_ruc: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  ciudad: string;

  @IsOptional()
  @IsString()
  pais: string;

  @IsOptional()
  @IsString()
  provincia: string;

  @IsOptional()
  @IsString()
  representante: string;

  @IsOptional()
  @IsNumber()
  comision: number;

  @IsOptional()
  @IsBoolean()
  estado: boolean;
}

