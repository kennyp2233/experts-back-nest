// src/mantenimiento/consignatarios/dto/create-consignatario.dto.ts
import { IsString, IsNumber, IsOptional, IsInt, IsBoolean, IsEmail } from 'class-validator';

export class CreateConsignatarioDto {
    @IsString()
    nombre_consignatario: string;

    @IsString()
    @IsOptional()
    ruc?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsOptional()
    @IsInt()
    id_embarcador: number;
    
    @IsOptional()
    @IsInt()
    id_cliente: number;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    ciudad?: string;

    @IsString()
    @IsOptional()
    pais?: string;

    // CAE SICE
    @IsString()
    @IsOptional()
    consignee_nombre?: string;

    @IsString()
    @IsOptional()
    consignee_direccion?: string;

    @IsString()
    @IsOptional()
    consignee_documento?: string;

    @IsString()
    @IsOptional()
    consignee_siglas_pais?: string;

    @IsString()
    @IsOptional()
    notify_nombre?: string;

    @IsString()
    @IsOptional()
    notify_direccion?: string;

    @IsString()
    @IsOptional()
    notify_documento?: string;

    @IsString()
    @IsOptional()
    notify_siglas_pais?: string;

    @IsString()
    @IsOptional()
    hawb_nombre?: string;

    @IsString()
    @IsOptional()
    hawb_direccion?: string;

    @IsString()
    @IsOptional()
    hawb_documento?: string;

    @IsString()
    @IsOptional()
    hawb_siglas_pais?: string;

    @IsInt()
    @IsOptional()
    consignee_tipo_documento?: number;

    @IsInt()
    @IsOptional()
    notify_tipo_documento?: number;

    @IsInt()
    @IsOptional()
    hawb_tipo_documento?: number;

    // FACTURACIÓN
    @IsString()
    @IsOptional()
    factura_nombre?: string;

    @IsString()
    @IsOptional()
    factura_ruc?: string;

    @IsString()
    @IsOptional()
    factura_direccion?: string;

    @IsString()
    @IsOptional()
    factura_telefono?: string;

    // FITO
    @IsString()
    @IsOptional()
    fito_declared_name?: string;

    @IsString()
    @IsOptional()
    fito_forma_a?: string;

    @IsString()
    @IsOptional()
    fito_nombre?: string;

    @IsString()
    @IsOptional()
    fito_direccion?: string;

    @IsString()
    @IsOptional()
    fito_pais?: string;

    // GUIA H
    @IsString()
    @IsOptional()
    guia_h_consignee?: string;

    @IsString()
    @IsOptional()
    guia_h_name_adress?: string;

    @IsString()
    @IsOptional()
    guia_h_notify?: string;

    // GUIA M
    @IsInt()
    @IsOptional()
    id_destino?: number;

    @IsString()
    @IsOptional()
    guia_m_consignee?: string;

    @IsString()
    @IsOptional()
    guia_m_name_address?: string;

    @IsString()
    @IsOptional()
    guia_m_notify?: string;

    // TRANSMISIÓN
    @IsString()
    @IsOptional()
    consignee_nombre_trans?: string;

    @IsString()
    @IsOptional()
    consignee_direccion_trans?: string;

    @IsString()
    @IsOptional()
    consignee_ciudad_trans?: string;

    @IsString()
    @IsOptional()
    consignee_provincia_trans?: string;

    @IsString()
    @IsOptional()
    consignee_pais_trans?: string;

    @IsString()
    @IsOptional()
    consignee_eueori_trans?: string;

    @IsString()
    @IsOptional()
    notify_nombre_trans?: string;

    @IsString()
    @IsOptional()
    notify_direccion_trans?: string;

    @IsString()
    @IsOptional()
    notify_ciudad_trans?: string;

    @IsString()
    @IsOptional()
    notify_provincia_trans?: string;

    @IsString()
    @IsOptional()
    notify_pais_trans?: string;

    @IsString()
    @IsOptional()
    notify_eueori_trans?: string;

    @IsString()
    @IsOptional()
    hawb_nombre_trans?: string;

    @IsString()
    @IsOptional()
    hawb_direccion_trans?: string;

    @IsString()
    @IsOptional()
    hawb_ciudad_trans?: string;

    @IsString()
    @IsOptional()
    hawb_provincia_trans?: string;

    @IsString()
    @IsOptional()
    hawb_pais_trans?: string;

    @IsString()
    @IsOptional()
    hawb_eueori_trans?: string;
}