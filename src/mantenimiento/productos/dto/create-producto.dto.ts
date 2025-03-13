// src/mantenimiento/productos/dto/create-producto.dto.ts
import { IsString, IsOptional, IsNumber, IsInt, IsBoolean } from 'class-validator';

export class CreateProductoDto {
    // Campos base del producto
    @IsString()
    @IsOptional()
    codigo_producto?: string;

    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    nombre_botanico?: string;

    @IsString()
    @IsOptional()
    especie?: string;

    @IsInt()
    @IsOptional()
    id_medida?: number;

    @IsNumber()
    @IsOptional()
    precio_unitario?: number | null;

    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @IsInt()
    @IsOptional()
    id_opcion?: number;

    @IsInt()
    @IsOptional()
    stems_por_full?: number;

    @IsInt()
    @IsOptional()
    id_sesa?: number;

    // Relaciones como objetos anidados
    @IsOptional()
    medida?: { id_medida: number };

    @IsOptional()
    opcion?: { id_opcion: number };

    // Arreglos para relaciones uno a muchos
    @IsOptional()
    aranceles?: ProductoArancelDto[];

    @IsOptional()
    producto_compuesto?: ProductoCompuestoDto[];

    @IsOptional()
    mipro?: ProductoMiProDto[];
}

// DTOs para las relaciones uno a muchos
export class ProductoArancelDto {
    @IsInt()
    @IsOptional()
    id_productos_aranceles?: number;

    @IsString()
    @IsOptional()
    aranceles_destino?: string;

    @IsString()
    @IsOptional()
    aranceles_codigo?: string;
}

export class ProductoCompuestoDto {
    @IsInt()
    @IsOptional()
    id_producto_compuesto?: number;

    @IsString()
    @IsOptional()
    producto_compuesto_destino?: string;

    @IsString()
    @IsOptional()
    producto_compuesto_declaracion?: string;
}

export class ProductoMiProDto {
    @IsInt()
    @IsOptional()
    id_productos_mi_pro?: number;

    @IsString()
    @IsOptional()
    mipro_acuerdo?: string;

    @IsString()
    @IsOptional()
    mipro_djocode?: string;

    @IsString()
    @IsOptional()
    mipro_tariffcode?: string;
}
