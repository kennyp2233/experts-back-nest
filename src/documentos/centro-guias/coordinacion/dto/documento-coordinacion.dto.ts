// src/documentos/centro-guias/coordinacion/dto/documento-coordinacion.dto.ts
import { IsArray, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum PagoType {
    PREPAID = 'PREPAID',
    COLLECT = 'COLLECT'
}

export class DocumentoCoordinacionDto {
    @IsInt()
    id: number;

    @IsInt()
    id_guia_madre: number;

    @IsInt()
    id_consignatario: number;

    @IsInt()
    id_producto: number;

    @IsInt()
    id_agencia_iata: number;

    @IsInt()
    id_destino_awb: number;

    @IsInt()
    id_destino_final_docs: number;

    @IsEnum(PagoType)
    pago: PagoType;

    @IsDate()
    @Type(() => Date)
    fecha_vuelo: Date;

    @IsDate()
    @Type(() => Date)
    fecha_asignacion: Date;

    @IsOptional()
    @IsInt()
    from1?: number;

    @IsOptional()
    @IsInt()
    to1?: number;

    @IsOptional()
    @IsInt()
    by1?: number;

    @IsOptional()
    @IsInt()
    to2?: number;

    @IsOptional()
    @IsInt()
    by2?: number;

    @IsOptional()
    @IsInt()
    to3?: number;

    @IsOptional()
    @IsInt()
    by3?: number;

    @IsOptional()
    @IsNumber()
    costo_guia_valor?: number;

    @IsOptional()
    @IsNumber()
    combustible_valor?: number;

    @IsOptional()
    @IsNumber()
    seguridad_valor?: number;

    @IsOptional()
    @IsNumber()
    aux_calculo_valor?: number;

    @IsOptional()
    @IsNumber()
    otros_valor?: number;

    @IsOptional()
    @IsNumber()
    aux1_valor?: number;

    @IsOptional()
    @IsNumber()
    aux2_valor?: number;

    @IsOptional()
    @IsNumber()
    tarifa_rate?: number;

    @IsOptional()
    @IsNumber()
    char_weight?: number;

    @IsOptional()
    @IsInt()
    form_a?: number;

    @IsOptional()
    @IsInt()
    transport?: number;

    @IsOptional()
    @IsNumber()
    pca?: number;

    @IsOptional()
    @IsInt()
    fitos?: number;

    @IsOptional()
    @IsInt()
    termografo?: number;

    @IsOptional()
    @IsInt()
    mca?: number;

    @IsOptional()
    @IsInt()
    tax?: number;

    @IsDate()
    @Type(() => Date)
    createdAt: Date;

    @IsDate()
    @Type(() => Date)
    updatedAt: Date;
}


