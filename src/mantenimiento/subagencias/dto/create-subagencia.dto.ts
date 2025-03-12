// src/mantenimiento/subagencias/dto/create-subagencia.dto.ts
import { IsString, IsNumber, IsBoolean, IsEmail } from 'class-validator';

export class CreateSubAgenciaDto {
  @IsString()
  nombre: string;

  @IsString()
  ci_ruc: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsEmail()
  email: string;

  @IsString()
  ciudad: string;

  @IsString()
  pais: string;

  @IsString()
  provincia: string;

  @IsString()
  representante: string;

  @IsNumber()
  comision: number;

  @IsBoolean()
  estado: boolean;
}

