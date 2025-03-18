// src/mantenimiento/fincas/dto/finca.dto.ts
import { Expose, Type } from 'class-transformer';

export class TipoDocumentoDto {
    @Expose()
    id_tipo_documento: number;

    @Expose()
    nombre: string;
}

export class ChoferDto {
    @Expose()
    id_chofer: number;

    @Expose()
    nombre_chofer: string;

    @Expose()
    ruc_chofer: string;

    @Expose()
    placas_camion?: string;

    @Expose()
    telefono_chofer?: string;

    @Expose()
    camion?: string;

    @Expose()
    estado_chofer?: boolean;
}

export class ProductoDto {
    @Expose()
    id_producto: number;

    @Expose()
    nombre?: string;

    @Expose()
    codigo_producto?: string;
}

export class FincaChoferDto {
    @Expose()
    id_fincas_choferes: number;

    @Expose()
    id_finca: number;

    @Expose()
    id_chofer: number;

    @Expose()
    @Type(() => ChoferDto)
    chofer?: ChoferDto;
}

export class FincaProductoDto {
    @Expose()
    id_fincas_productos: number;

    @Expose()
    id_finca: number;

    @Expose()
    id_producto: number;

    @Expose()
    @Type(() => ProductoDto)
    producto?: ProductoDto;
}

export class FincaDto {
    @Expose()
    id_finca: number;

    @Expose()
    nombre_finca: string;

    @Expose()
    codigo_finca: string;

    @Expose()
    ruc_finca?: string;

    @Expose()
    id_tipo_documento?: number;

    @Expose()
    genera_guias_certificadas?: boolean;

    @Expose()
    i_general_telefono?: string;

    @Expose()
    i_general_email?: string;

    @Expose()
    i_general_ciudad?: string;

    @Expose()
    i_general_provincia?: string;

    @Expose()
    i_general_pais?: string;

    @Expose()
    i_general_cod_sesa?: string;

    @Expose()
    i_general_cod_pais?: string;

    @Expose()
    dim_x?: number;

    @Expose()
    dim_y?: number;

    @Expose()
    dim_z?: number;

    @Expose()
    excel_plantilla?: string;

    @Expose()
    a_nombre?: string;

    @Expose()
    a_codigo?: string;

    @Expose()
    a_direccion?: string;

    @Expose()
    @Type(() => TipoDocumentoDto)
    tipo_documento?: TipoDocumentoDto;

    @Expose()
    @Type(() => FincaChoferDto)
    fincas_choferes?: FincaChoferDto[];

    @Expose()
    @Type(() => FincaProductoDto)
    fincas_productos?: FincaProductoDto[];
}