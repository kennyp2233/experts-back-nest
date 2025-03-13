// src/mantenimiento/aerolineas/dto/create-aerolinea.dto.ts
import { IsString, IsOptional, IsBoolean, IsInt, IsEmail } from 'class-validator';

export class CreateAerolineaDto {
    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    ci_ruc?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

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

    @IsString()
    @IsOptional()
    contacto?: string;

    @IsInt()
    @IsOptional()
    id_modo?: number;

    @IsBoolean()
    @IsOptional()
    maestra_guias_hijas?: boolean;

    @IsString()
    @IsOptional()
    codigo?: string;

    @IsString()
    @IsOptional()
    prefijo_awb?: string;

    @IsString()
    @IsOptional()
    codigo_cae?: string;

    @IsBoolean()
    @IsOptional()
    estado_activo?: boolean;

    @IsInt()
    @IsOptional()
    from1?: number;

    @IsInt()
    @IsOptional()
    to1?: number;

    @IsInt()
    @IsOptional()
    by1?: number;

    @IsInt()
    @IsOptional()
    to2?: number;

    @IsInt()
    @IsOptional()
    by2?: number;

    @IsInt()
    @IsOptional()
    to3?: number;

    @IsInt()
    @IsOptional()
    by3?: number;

    @IsBoolean()
    @IsOptional()
    afiliado_cass?: boolean;

    @IsBoolean()
    @IsOptional()
    guias_virtuales?: boolean;
}