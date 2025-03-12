// src/mantenimiento/funcionarios-agrocalidad/dto/update-funcionario-agrocalidad.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioAgrocalidadDto } from './create-funcionario-agrocalidad.dto';
import { IsInt } from 'class-validator';

export class UpdateFuncionarioAgrocalidadDto extends PartialType(CreateFuncionarioAgrocalidadDto) {
    @IsInt()
    id_funcionario_agrocalidad: number;
}