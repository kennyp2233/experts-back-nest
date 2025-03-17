// src/documentos/guia-madre/dto/create-guia-madre.dto.ts
import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGuiaMadreDto {
    @IsInt()
    @Min(1)
    prefijo: number;

    @IsInt()
    @Min(1)
    secuencial: number;

    @IsInt()
    id_documento_base: number;

    @IsOptional()
    @IsBoolean()
    prestamo?: boolean;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha_prestamo?: Date;

    @IsOptional()
    @IsBoolean()
    devolucion?: boolean;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fecha_devolucion?: Date;
}
