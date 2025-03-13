// src/mantenimiento/aerolineas/dto/create-aerolinea.dto.ts
import { IsString, IsOptional, IsBoolean, IsInt, IsNumber, IsEmail } from 'class-validator';

export class CreateAerolineaCompletaDto {
  // Campos base de aerolínea
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

  // Campos de plantilla integrados
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

  @IsNumber()
  @IsOptional()
  iva_valor?: number;

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

  // Relaciones como objetos anidados (opcionales)
  @IsOptional()
  modo?: { id_modo: number };

  @IsOptional()
  origen1?: { id_origen: number };

  @IsOptional()
  destino1?: { id_destino: number };

  @IsOptional()
  via1?: { id_aerolinea: number };

  @IsOptional()
  destino2?: { id_destino: number };

  @IsOptional()
  via2?: { id_aerolinea: number };

  @IsOptional()
  destino3?: { id_destino: number };

  @IsOptional()
  via3?: { id_aerolinea: number };

  @IsOptional()
  multiplicador1?: { id_multiplicador: number };

  @IsOptional()
  multiplicador2?: { id_multiplicador: number };

  @IsOptional()
  multiplicador3?: { id_multiplicador: number };
}