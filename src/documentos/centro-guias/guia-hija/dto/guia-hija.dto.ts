// src/documentos/centro-guias/guia-hija/dto/guia-hija.dto.ts
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GuiaHijaDto {
    @IsInt()
    id: number;

    @IsInt()
    id_documento_coordinacion: number;

    @IsInt()
    id_guia_madre: number;

    @IsInt()
    id_finca: number;

    @IsOptional()
    @IsInt()
    id_producto?: number;

    @IsString()
    numero_guia_hija: string;

    @IsInt()
    anio: number;

    @IsInt()
    secuencial: number;

    @IsOptional()
    @IsInt()
    fulls?: number;

    @IsOptional()
    @IsInt()
    pcs?: number;

    @IsOptional()
    @IsNumber()
    kgs?: number;

    @IsOptional()
    @IsInt()
    stems?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    // Relaciones potencialmente incluidas
    producto?: any;
    finca?: any;
    guia_madre?: any;
    documento_coordinacion?: any;
}