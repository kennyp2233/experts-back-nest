// src/mantenimiento/aerolineas/dto/create-aerolinea-plantilla.dto.ts
import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateAerolineaPlantillaDto {
    @IsString()
    @IsOptional()
    costo_guia_abrv?: string;

    @IsString()
    @IsOptional()
    combustible_abrv?: string;

    @IsString()
    @IsOptional()
    seguridad_abrv?: string;

    @IsString()
    @IsOptional()
    aux_calculo_abrv?: string;

    @IsString()
    @IsOptional()
    iva_abrv?: string;

    @IsString()
    @IsOptional()
    otros_abrv?: string;

    @IsString()
    @IsOptional()
    aux1_abrv?: string;

    @IsString()
    @IsOptional()
    aux2_abrv?: string;

    @IsNumber()
    @IsOptional()
    costo_guia_valor?: number;

    @IsNumber()
    @IsOptional()
    combustible_valor?: number;

    @IsNumber()
    @IsOptional()
    seguridad_valor?: number;

    @IsNumber()
    @IsOptional()
    aux_calculo_valor?: number;

    @IsNumber()
    @IsOptional()
    otros_valor?: number;

    @IsNumber()
    @IsOptional()
    aux1_valor?: number;

    @IsNumber()
    @IsOptional()
    aux2_valor?: number;

    @IsString()
    @IsOptional()
    plantilla_guia_madre?: string;

    @IsString()
    @IsOptional()
    plantilla_formato_aerolinea?: string;

    @IsString()
    @IsOptional()
    plantilla_reservas?: string;

    @IsNumber()
    @IsOptional()
    tarifa_rate?: number;

    @IsNumber()
    @IsOptional()
    pca?: number;

    @IsInt()
    @IsOptional()
    combustible_mult?: number;

    @IsInt()
    @IsOptional()
    seguridad_mult?: number;

    @IsInt()
    @IsOptional()
    aux_calc_mult?: number;

    @IsNumber()
    @IsOptional()
    iva_valor?: number;
}