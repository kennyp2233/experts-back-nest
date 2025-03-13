// src/mantenimiento/funcionarios-agrocalidad/dto/create-funcionario-agrocalidad.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateFuncionarioAgrocalidadDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsBoolean()
  estado: boolean;
}

