// src/mantenimiento/fincas/dto/create-finca.dto.ts
import { IsString, IsInt, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFincaChoferDto {
    @IsInt()
    id_chofer: number;
}

export class CreateFincaProductoDto {
    @IsInt()
    id_producto: number;
}

export class CreateFincaDto {
    @IsString()
    nombre_finca: string;

    @IsString()
    codigo_finca: string;

    @IsString()
    @IsOptional()
    ruc_finca?: string;

    @IsInt()
    @IsOptional()
    id_tipo_documento?: number;

    @IsBoolean()
    @IsOptional()
    genera_guias_certificadas?: boolean;

    @IsString()
    @IsOptional()
    i_general_telefono?: string;

    @IsString()
    @IsOptional()
    i_general_email?: string;

    @IsString()
    @IsOptional()
    i_general_ciudad?: string;

    @IsString()
    @IsOptional()
    i_general_provincia?: string;

    @IsString()
    @IsOptional()
    i_general_pais?: string;

    @IsString()
    @IsOptional()
    i_general_cod_sesa?: string;

    @IsString()
    @IsOptional()
    i_general_cod_pais?: string;

    @IsInt()
    @IsOptional()
    dim_x?: number;

    @IsInt()
    @IsOptional()
    dim_y?: number;

    @IsInt()
    @IsOptional()
    dim_z?: number;

    @IsString()
    @IsOptional()
    excel_plantilla?: string;

    @IsString()
    @IsOptional()
    a_nombre?: string;

    @IsString()
    @IsOptional()
    a_codigo?: string;

    @IsString()
    @IsOptional()
    a_direccion?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFincaChoferDto)
    @IsOptional()
    fincas_choferes?: CreateFincaChoferDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFincaProductoDto)
    @IsOptional()
    fincas_productos?: CreateFincaProductoDto[];
}



