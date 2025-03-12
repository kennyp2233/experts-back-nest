// src/mantenimiento/funcionarios-agrocalidad/dto/create-funcionario-agrocalidad.dto.ts
import { IsString, IsBoolean } from 'class-validator';

export class CreateFuncionarioAgrocalidadDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;

  @IsString()
  email: string;

  @IsBoolean()
  estado: boolean;
}

