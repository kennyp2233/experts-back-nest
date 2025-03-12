

// src/mantenimiento/consignatarios/dto/update-consignatario.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateConsignatarioDto } from './create-consignatario.dto';
import { IsInt } from 'class-validator';

export class UpdateConsignatarioDto extends PartialType(CreateConsignatarioDto) {
    @IsInt()
    id_consignatario: number;
}

// Para mantener compatibilidad con la versión anterior, permitiendo datos anidados
export interface ConsignatarioRelacionado {
    // Referencias a otros objetos
    embarcador?: { id_embarcador: number };
    cliente?: { id_clientes: number };
    tipo_documento_consignee?: { id_tipo_documento?: number };
    tipo_documento_notify?: { id_tipo_documento?: number };
    tipo_documento_hawb?: { id_tipo_documento?: number };
    destino?: { id_destino?: number };
}