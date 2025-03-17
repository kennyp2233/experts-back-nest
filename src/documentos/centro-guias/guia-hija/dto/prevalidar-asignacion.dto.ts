
// src/documentos/centro-guias/guia-hija/dto/prevalidar-asignacion.dto.ts
import { IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AsignarGuiaHijaDto } from './asignar-guia-hija.dto';

export class PrevalidarAsignacionDto {
    @ValidateNested({ each: true })
    @Type(() => AsignarGuiaHijaDto)
    asignaciones: AsignarGuiaHijaDto[];
}