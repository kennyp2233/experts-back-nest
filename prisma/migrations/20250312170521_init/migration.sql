-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "ClienteRol" (
    "id_usuario" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,

    CONSTRAINT "ClienteRol_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "FincaRol" (
    "id_usuario" TEXT NOT NULL,
    "codigo_finca" TEXT,
    "direccion_finca" TEXT,
    "cliente_previo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FincaRol_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "PendienteRol" (
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "PendienteRol_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Aerolinea" (
    "id_aerolinea" SERIAL NOT NULL,
    "nombre" TEXT,
    "ci_ruc" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "contacto" TEXT,
    "id_modo" INTEGER,
    "maestra_guias_hijas" BOOLEAN,
    "codigo" TEXT,
    "prefijo_awb" TEXT,
    "codigo_cae" TEXT,
    "estado_activo" BOOLEAN DEFAULT true,
    "from1" INTEGER,
    "to1" INTEGER,
    "by1" INTEGER,
    "to2" INTEGER,
    "by2" INTEGER,
    "to3" INTEGER,
    "by3" INTEGER,
    "afiliado_cass" BOOLEAN DEFAULT false,
    "guias_virtuales" BOOLEAN DEFAULT false,

    CONSTRAINT "Aerolinea_pkey" PRIMARY KEY ("id_aerolinea")
);

-- CreateTable
CREATE TABLE "AerolineasPlantilla" (
    "id_aerolinea" INTEGER NOT NULL,
    "costo_guia_abrv" TEXT,
    "combustible_abrv" TEXT,
    "seguridad_abrv" TEXT,
    "aux_calculo_abrv" TEXT,
    "iva_abrv" TEXT,
    "otros_abrv" TEXT,
    "aux1_abrv" TEXT,
    "aux2_abrv" TEXT,
    "costo_guia_valor" DOUBLE PRECISION,
    "combustible_valor" DOUBLE PRECISION,
    "seguridad_valor" DOUBLE PRECISION,
    "aux_calculo_valor" DOUBLE PRECISION,
    "otros_valor" DOUBLE PRECISION,
    "aux1_valor" DOUBLE PRECISION,
    "aux2_valor" DOUBLE PRECISION,
    "plantilla_guia_madre" TEXT,
    "plantilla_formato_aerolinea" TEXT,
    "plantilla_reservas" TEXT,
    "tarifa_rate" DOUBLE PRECISION,
    "pca" DOUBLE PRECISION,
    "combustible_mult" INTEGER,
    "seguridad_mult" INTEGER,
    "aux_calc_mult" INTEGER,
    "iva_valor" DOUBLE PRECISION,

    CONSTRAINT "AerolineasPlantilla_pkey" PRIMARY KEY ("id_aerolinea")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id_pais" SERIAL NOT NULL,
    "siglas_pais" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "pais_id" INTEGER,
    "id_acuerdo" INTEGER,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id_pais")
);

-- CreateTable
CREATE TABLE "AcuerdoArancelario" (
    "id_acuerdo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "AcuerdoArancelario_pkey" PRIMARY KEY ("id_acuerdo")
);

-- CreateTable
CREATE TABLE "Origen" (
    "id_origen" SERIAL NOT NULL,
    "codigo_origen" TEXT,
    "nombre" TEXT,
    "aeropuerto" TEXT,
    "id_pais" INTEGER,
    "id_cae_aduana" INTEGER,

    CONSTRAINT "Origen_pkey" PRIMARY KEY ("id_origen")
);

-- CreateTable
CREATE TABLE "CaeAduana" (
    "id_cae_aduana" SERIAL NOT NULL,
    "codigo_aduana" INTEGER,
    "nombre" TEXT,

    CONSTRAINT "CaeAduana_pkey" PRIMARY KEY ("id_cae_aduana")
);

-- CreateTable
CREATE TABLE "Destino" (
    "id_destino" SERIAL NOT NULL,
    "codigo_destino" TEXT,
    "nombre" TEXT,
    "aeropuerto" TEXT,
    "id_pais" INTEGER,
    "sesa_id" TEXT,
    "leyenda_fito" TEXT,
    "cobro_fitos" BOOLEAN DEFAULT false,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("id_destino")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id_clientes" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ruc" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,
    "cliente_codigo_pais" TEXT,
    "fitos_valor" DOUBLE PRECISION,
    "form_a" INTEGER,
    "transport" INTEGER,
    "termo" INTEGER,
    "mica" INTEGER,
    "handling" DOUBLE PRECISION,
    "cuenta_contable" TEXT,
    "nombre_factura" TEXT,
    "ruc_factura" TEXT,
    "direccion_factura" TEXT,
    "telefono_factura" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id_clientes")
);

-- CreateTable
CREATE TABLE "Embarcador" (
    "id_embarcador" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci" TEXT,
    "direccion" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "ciudad" TEXT,
    "provincia" TEXT,
    "pais" TEXT,
    "embarcador_codigo_pais" TEXT,
    "handling" DOUBLE PRECISION,
    "estado" BOOLEAN,

    CONSTRAINT "Embarcador_pkey" PRIMARY KEY ("id_embarcador")
);

-- CreateTable
CREATE TABLE "Consignatario" (
    "id_consignatario" SERIAL NOT NULL,
    "nombre_consignatario" TEXT NOT NULL,
    "ruc" TEXT,
    "direccion" TEXT,
    "id_embarcador" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "ciudad" TEXT,
    "pais" TEXT,

    CONSTRAINT "Consignatario_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioCaeSice" (
    "id_consignatario" INTEGER NOT NULL,
    "consignee_nombre" TEXT,
    "consignee_direccion" TEXT,
    "consignee_documento" TEXT,
    "consignee_siglas_pais" TEXT,
    "notify_nombre" TEXT,
    "notify_direccion" TEXT,
    "notify_documento" TEXT,
    "notify_siglas_pais" TEXT,
    "hawb_nombre" TEXT,
    "hawb_direccion" TEXT,
    "hawb_documento" TEXT,
    "hawb_siglas_pais" TEXT,
    "consignee_tipo_documento" INTEGER,
    "notify_tipo_documento" INTEGER,
    "hawb_tipo_documento" INTEGER,

    CONSTRAINT "ConsignatarioCaeSice_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioFacturacion" (
    "id_consignatario" INTEGER NOT NULL,
    "factura_nombre" TEXT,
    "factura_ruc" TEXT,
    "factura_direccion" TEXT,
    "factura_telefono" TEXT,

    CONSTRAINT "ConsignatarioFacturacion_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioFito" (
    "id_consignatario" INTEGER NOT NULL,
    "fito_declared_name" TEXT,
    "fito_forma_a" TEXT,
    "fito_nombre" TEXT,
    "fito_direccion" TEXT,
    "fito_pais" TEXT,

    CONSTRAINT "ConsignatarioFito_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioGuiaH" (
    "id_consignatario" INTEGER NOT NULL,
    "guia_h_consignee" TEXT,
    "guia_h_name_adress" TEXT,
    "guia_h_notify" TEXT,

    CONSTRAINT "ConsignatarioGuiaH_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioGuiaM" (
    "id_consignatario" INTEGER NOT NULL,
    "id_destino" INTEGER,
    "guia_m_consignee" TEXT,
    "guia_m_name_address" TEXT,
    "guia_m_notify" TEXT,

    CONSTRAINT "ConsignatarioGuiaM_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "ConsignatarioTransmision" (
    "id_consignatario" INTEGER NOT NULL,
    "consignee_nombre_trans" TEXT,
    "consignee_direccion_trans" TEXT,
    "consignee_ciudad_trans" TEXT,
    "consignee_provincia_trans" TEXT,
    "consignee_pais_trans" TEXT,
    "consignee_eueori_trans" TEXT,
    "notify_nombre_trans" TEXT,
    "notify_direccion_trans" TEXT,
    "notify_ciudad_trans" TEXT,
    "notify_provincia_trans" TEXT,
    "notify_pais_trans" TEXT,
    "notify_eueori_trans" TEXT,
    "hawb_nombre_trans" TEXT,
    "hawb_direccion_trans" TEXT,
    "hawb_ciudad_trans" TEXT,
    "hawb_provincia_trans" TEXT,
    "hawb_pais_trans" TEXT,
    "hawb_eueori_trans" TEXT,

    CONSTRAINT "ConsignatarioTransmision_pkey" PRIMARY KEY ("id_consignatario")
);

-- CreateTable
CREATE TABLE "Finca" (
    "id_finca" SERIAL NOT NULL,
    "nombre_finca" TEXT NOT NULL,
    "codigo_finca" TEXT NOT NULL,
    "ruc_finca" TEXT,
    "id_tipo_documento" INTEGER,
    "genera_guias_certificadas" BOOLEAN,
    "i_general_telefono" TEXT,
    "i_general_email" TEXT,
    "i_general_ciudad" TEXT,
    "i_general_provincia" TEXT,
    "i_general_pais" TEXT,
    "i_general_cod_sesa" TEXT,
    "i_general_cod_pais" TEXT,
    "dim_x" INTEGER,
    "dim_y" INTEGER,
    "dim_z" INTEGER,
    "excel_plantilla" TEXT,
    "a_nombre" TEXT,
    "a_codigo" TEXT,
    "a_direccion" TEXT,

    CONSTRAINT "Finca_pkey" PRIMARY KEY ("id_finca")
);

-- CreateTable
CREATE TABLE "FincaChofer" (
    "id_fincas_choferes" SERIAL NOT NULL,
    "id_finca" INTEGER NOT NULL,
    "id_chofer" INTEGER NOT NULL,

    CONSTRAINT "FincaChofer_pkey" PRIMARY KEY ("id_fincas_choferes")
);

-- CreateTable
CREATE TABLE "FincaProducto" (
    "id_fincas_productos" SERIAL NOT NULL,
    "id_finca" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,

    CONSTRAINT "FincaProducto_pkey" PRIMARY KEY ("id_fincas_productos")
);

-- CreateTable
CREATE TABLE "Chofer" (
    "id_chofer" SERIAL NOT NULL,
    "nombre_chofer" TEXT NOT NULL,
    "ruc_chofer" TEXT NOT NULL,
    "placas_camion" TEXT,
    "telefono_chofer" TEXT,
    "camion" TEXT,
    "estado_chofer" BOOLEAN NOT NULL,

    CONSTRAINT "Chofer_pkey" PRIMARY KEY ("id_chofer")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" SERIAL NOT NULL,
    "codigo_producto" TEXT,
    "nombre" TEXT,
    "descripcion" TEXT,
    "nombre_botanico" TEXT,
    "especie" TEXT,
    "id_medida" INTEGER,
    "precio_unitario" DOUBLE PRECISION,
    "estado" BOOLEAN,
    "id_opcion" INTEGER,
    "stems_por_full" INTEGER,
    "id_sesa" INTEGER,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "ProductosAranceles" (
    "id_productos_aranceles" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "aranceles_destino" TEXT,
    "aranceles_codigo" TEXT,

    CONSTRAINT "ProductosAranceles_pkey" PRIMARY KEY ("id_productos_aranceles")
);

-- CreateTable
CREATE TABLE "ProductosCompuesto" (
    "id_producto_compuesto" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "producto_compuesto_destino" TEXT,
    "producto_compuesto_declaracion" TEXT,

    CONSTRAINT "ProductosCompuesto_pkey" PRIMARY KEY ("id_producto_compuesto")
);

-- CreateTable
CREATE TABLE "ProductosMiPro" (
    "id_productos_mi_pro" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "mipro_acuerdo" TEXT,
    "mipro_djocode" TEXT,
    "mipro_tariffcode" TEXT,

    CONSTRAINT "ProductosMiPro_pkey" PRIMARY KEY ("id_productos_mi_pro")
);

-- CreateTable
CREATE TABLE "TipoEmbarque" (
    "id_tipo_embarque" SERIAL NOT NULL,
    "codigo_embarque" TEXT,
    "nombre" TEXT,
    "id_tipo_carga" INTEGER,
    "id_tipo_embalaje" INTEGER,
    "regimen" TEXT,
    "mercancia" TEXT,
    "harmonised_comidity" TEXT,

    CONSTRAINT "TipoEmbarque_pkey" PRIMARY KEY ("id_tipo_embarque")
);

-- CreateTable
CREATE TABLE "TipoCarga" (
    "id_tipo_carga" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoCarga_pkey" PRIMARY KEY ("id_tipo_carga")
);

-- CreateTable
CREATE TABLE "TipoEmbalaje" (
    "id_tipo_embalaje" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoEmbalaje_pkey" PRIMARY KEY ("id_tipo_embalaje")
);

-- CreateTable
CREATE TABLE "TipoDocumento" (
    "id_tipo_documento" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "TipoDocumento_pkey" PRIMARY KEY ("id_tipo_documento")
);

-- CreateTable
CREATE TABLE "CatalogoModoAerolinea" (
    "id_modo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "CatalogoModoAerolinea_pkey" PRIMARY KEY ("id_modo")
);

-- CreateTable
CREATE TABLE "CatalogoMultiplicadorAerolinea" (
    "id_multiplicador" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "CatalogoMultiplicadorAerolinea_pkey" PRIMARY KEY ("id_multiplicador")
);

-- CreateTable
CREATE TABLE "catalogo_productos_s_c" (
    "id_opcion" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "catalogo_productos_s_c_pkey" PRIMARY KEY ("id_opcion")
);

-- CreateTable
CREATE TABLE "catalogo_productos_unidad_medida" (
    "id_medida" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "catalogo_productos_unidad_medida_pkey" PRIMARY KEY ("id_medida")
);

-- CreateTable
CREATE TABLE "DocumentoBaseStock" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,

    CONSTRAINT "DocumentoBaseStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgenciaIata" (
    "id_agencia_iata" SERIAL NOT NULL,
    "alias_shipper" TEXT NOT NULL,
    "nombre_shipper" TEXT,
    "ruc_shipper" TEXT,
    "direccion_shipper" TEXT,
    "telefono_shipper" TEXT,
    "ciudad_shipper" TEXT,
    "pais_shipper" TEXT,
    "nombre_carrier" TEXT,
    "ruc_carrier" TEXT,
    "direccion_carrier" TEXT,
    "telefono_carrier" TEXT,
    "ciudad_carrier" TEXT,
    "pais_carrier" TEXT,
    "iata_code_carrier" TEXT,
    "registro_exportador" TEXT,
    "codigo_operador" TEXT,
    "codigo_consolidador" TEXT,
    "comision" DOUBLE PRECISION,
    "estado_agencia_iata" BOOLEAN DEFAULT true,

    CONSTRAINT "AgenciaIata_pkey" PRIMARY KEY ("id_agencia_iata")
);

-- CreateTable
CREATE TABLE "SubAgencia" (
    "id_subagencia" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci_ruc" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "comision" DOUBLE PRECISION NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "SubAgencia_pkey" PRIMARY KEY ("id_subagencia")
);

-- CreateTable
CREATE TABLE "FuncionarioAgrocalidad" (
    "id_funcionario_agrocalidad" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "FuncionarioAgrocalidad_pkey" PRIMARY KEY ("id_funcionario_agrocalidad")
);

-- CreateTable
CREATE TABLE "Bodeguero" (
    "id_bodeguero" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "clave_bodega" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL,

    CONSTRAINT "Bodeguero_pkey" PRIMARY KEY ("id_bodeguero")
);

-- CreateTable
CREATE TABLE "ValoresAgencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "valor" DOUBLE PRECISION,

    CONSTRAINT "ValoresAgencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoBase" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3),
    "id_aerolinea" INTEGER,
    "id_referencia" INTEGER,
    "id_stock" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DocumentoBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuiaMadre" (
    "id" SERIAL NOT NULL,
    "prefijo" INTEGER NOT NULL,
    "secuencial" INTEGER NOT NULL,
    "id_documento_base" INTEGER NOT NULL,
    "prestamo" BOOLEAN DEFAULT false,
    "observaciones" TEXT,
    "fecha_prestamo" TIMESTAMP(3),
    "devolucion" BOOLEAN DEFAULT false,
    "fecha_devolucion" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GuiaMadre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoCoordinacion" (
    "id" SERIAL NOT NULL,
    "id_guia_madre" INTEGER NOT NULL,
    "id_consignatario" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_agencia_iata" INTEGER NOT NULL,
    "id_destino_awb" INTEGER NOT NULL,
    "id_destino_final_docs" INTEGER NOT NULL,
    "pago" TEXT NOT NULL DEFAULT 'PREPAID',
    "fecha_vuelo" TIMESTAMP(3) NOT NULL,
    "fecha_asignacion" TIMESTAMP(3) NOT NULL,
    "from1" INTEGER,
    "to1" INTEGER,
    "by1" INTEGER,
    "to2" INTEGER,
    "by2" INTEGER,
    "to3" INTEGER,
    "by3" INTEGER,
    "costo_guia_valor" DOUBLE PRECISION,
    "combustible_valor" DOUBLE PRECISION,
    "seguridad_valor" DOUBLE PRECISION,
    "aux_calculo_valor" DOUBLE PRECISION,
    "otros_valor" DOUBLE PRECISION,
    "aux1_valor" DOUBLE PRECISION,
    "aux2_valor" DOUBLE PRECISION,
    "tarifa_rate" DOUBLE PRECISION,
    "char_weight" DOUBLE PRECISION,
    "form_a" INTEGER,
    "transport" INTEGER,
    "pca" DOUBLE PRECISION,
    "fitos" INTEGER,
    "termografo" INTEGER,
    "mca" INTEGER,
    "tax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentoCoordinacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinacionClientes" (
    "id_coordinacion" INTEGER NOT NULL,
    "id_cliente" INTEGER NOT NULL,

    CONSTRAINT "CoordinacionClientes_pkey" PRIMARY KEY ("id_coordinacion","id_cliente")
);

-- CreateTable
CREATE TABLE "GuiaHija" (
    "id" SERIAL NOT NULL,
    "id_documento_coordinacion" INTEGER NOT NULL,
    "id_guia_madre" INTEGER NOT NULL,
    "id_finca" INTEGER NOT NULL,
    "numero_guia_hija" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "secuencial" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "GuiaHija_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pais_siglas_pais_key" ON "Pais"("siglas_pais");

-- CreateIndex
CREATE UNIQUE INDEX "AgenciaIata_alias_shipper_key" ON "AgenciaIata"("alias_shipper");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentoCoordinacion_id_guia_madre_key" ON "DocumentoCoordinacion"("id_guia_madre");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClienteRol" ADD CONSTRAINT "ClienteRol_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FincaRol" ADD CONSTRAINT "FincaRol_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendienteRol" ADD CONSTRAINT "PendienteRol_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_id_modo_fkey" FOREIGN KEY ("id_modo") REFERENCES "CatalogoModoAerolinea"("id_modo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_from1_fkey" FOREIGN KEY ("from1") REFERENCES "Origen"("id_origen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_to1_fkey" FOREIGN KEY ("to1") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_by1_fkey" FOREIGN KEY ("by1") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_to2_fkey" FOREIGN KEY ("to2") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_by2_fkey" FOREIGN KEY ("by2") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_to3_fkey" FOREIGN KEY ("to3") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aerolinea" ADD CONSTRAINT "Aerolinea_by3_fkey" FOREIGN KEY ("by3") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AerolineasPlantilla" ADD CONSTRAINT "AerolineasPlantilla_id_aerolinea_fkey" FOREIGN KEY ("id_aerolinea") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AerolineasPlantilla" ADD CONSTRAINT "AerolineasPlantilla_combustible_mult_fkey" FOREIGN KEY ("combustible_mult") REFERENCES "CatalogoMultiplicadorAerolinea"("id_multiplicador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AerolineasPlantilla" ADD CONSTRAINT "AerolineasPlantilla_seguridad_mult_fkey" FOREIGN KEY ("seguridad_mult") REFERENCES "CatalogoMultiplicadorAerolinea"("id_multiplicador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AerolineasPlantilla" ADD CONSTRAINT "AerolineasPlantilla_aux_calc_mult_fkey" FOREIGN KEY ("aux_calc_mult") REFERENCES "CatalogoMultiplicadorAerolinea"("id_multiplicador") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pais" ADD CONSTRAINT "Pais_id_acuerdo_fkey" FOREIGN KEY ("id_acuerdo") REFERENCES "AcuerdoArancelario"("id_acuerdo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Origen" ADD CONSTRAINT "Origen_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "Pais"("id_pais") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Origen" ADD CONSTRAINT "Origen_id_cae_aduana_fkey" FOREIGN KEY ("id_cae_aduana") REFERENCES "CaeAduana"("id_cae_aduana") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destino" ADD CONSTRAINT "Destino_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "Pais"("id_pais") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consignatario" ADD CONSTRAINT "Consignatario_id_embarcador_fkey" FOREIGN KEY ("id_embarcador") REFERENCES "Embarcador"("id_embarcador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consignatario" ADD CONSTRAINT "Consignatario_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_clientes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioCaeSice" ADD CONSTRAINT "ConsignatarioCaeSice_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioCaeSice" ADD CONSTRAINT "ConsignatarioCaeSice_consignee_tipo_documento_fkey" FOREIGN KEY ("consignee_tipo_documento") REFERENCES "TipoDocumento"("id_tipo_documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioCaeSice" ADD CONSTRAINT "ConsignatarioCaeSice_notify_tipo_documento_fkey" FOREIGN KEY ("notify_tipo_documento") REFERENCES "TipoDocumento"("id_tipo_documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioCaeSice" ADD CONSTRAINT "ConsignatarioCaeSice_hawb_tipo_documento_fkey" FOREIGN KEY ("hawb_tipo_documento") REFERENCES "TipoDocumento"("id_tipo_documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioFacturacion" ADD CONSTRAINT "ConsignatarioFacturacion_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioFito" ADD CONSTRAINT "ConsignatarioFito_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioGuiaH" ADD CONSTRAINT "ConsignatarioGuiaH_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioGuiaM" ADD CONSTRAINT "ConsignatarioGuiaM_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioGuiaM" ADD CONSTRAINT "ConsignatarioGuiaM_id_destino_fkey" FOREIGN KEY ("id_destino") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsignatarioTransmision" ADD CONSTRAINT "ConsignatarioTransmision_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finca" ADD CONSTRAINT "Finca_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "TipoDocumento"("id_tipo_documento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FincaChofer" ADD CONSTRAINT "FincaChofer_id_finca_fkey" FOREIGN KEY ("id_finca") REFERENCES "Finca"("id_finca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FincaChofer" ADD CONSTRAINT "FincaChofer_id_chofer_fkey" FOREIGN KEY ("id_chofer") REFERENCES "Chofer"("id_chofer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FincaProducto" ADD CONSTRAINT "FincaProducto_id_finca_fkey" FOREIGN KEY ("id_finca") REFERENCES "Finca"("id_finca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FincaProducto" ADD CONSTRAINT "FincaProducto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_medida_fkey" FOREIGN KEY ("id_medida") REFERENCES "catalogo_productos_unidad_medida"("id_medida") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_opcion_fkey" FOREIGN KEY ("id_opcion") REFERENCES "catalogo_productos_s_c"("id_opcion") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosAranceles" ADD CONSTRAINT "ProductosAranceles_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosCompuesto" ADD CONSTRAINT "ProductosCompuesto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductosMiPro" ADD CONSTRAINT "ProductosMiPro_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoEmbarque" ADD CONSTRAINT "TipoEmbarque_id_tipo_carga_fkey" FOREIGN KEY ("id_tipo_carga") REFERENCES "TipoCarga"("id_tipo_carga") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoEmbarque" ADD CONSTRAINT "TipoEmbarque_id_tipo_embalaje_fkey" FOREIGN KEY ("id_tipo_embalaje") REFERENCES "TipoEmbalaje"("id_tipo_embalaje") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoBase" ADD CONSTRAINT "DocumentoBase_id_aerolinea_fkey" FOREIGN KEY ("id_aerolinea") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoBase" ADD CONSTRAINT "DocumentoBase_id_referencia_fkey" FOREIGN KEY ("id_referencia") REFERENCES "AgenciaIata"("id_agencia_iata") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoBase" ADD CONSTRAINT "DocumentoBase_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "DocumentoBaseStock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaMadre" ADD CONSTRAINT "GuiaMadre_id_documento_base_fkey" FOREIGN KEY ("id_documento_base") REFERENCES "DocumentoBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_guia_madre_fkey" FOREIGN KEY ("id_guia_madre") REFERENCES "GuiaMadre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_consignatario_fkey" FOREIGN KEY ("id_consignatario") REFERENCES "Consignatario"("id_consignatario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_agencia_iata_fkey" FOREIGN KEY ("id_agencia_iata") REFERENCES "AgenciaIata"("id_agencia_iata") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_destino_awb_fkey" FOREIGN KEY ("id_destino_awb") REFERENCES "Destino"("id_destino") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_id_destino_final_docs_fkey" FOREIGN KEY ("id_destino_final_docs") REFERENCES "Destino"("id_destino") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_from1_fkey" FOREIGN KEY ("from1") REFERENCES "Origen"("id_origen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_to1_fkey" FOREIGN KEY ("to1") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_by1_fkey" FOREIGN KEY ("by1") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_to2_fkey" FOREIGN KEY ("to2") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_by2_fkey" FOREIGN KEY ("by2") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_to3_fkey" FOREIGN KEY ("to3") REFERENCES "Destino"("id_destino") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoCoordinacion" ADD CONSTRAINT "DocumentoCoordinacion_by3_fkey" FOREIGN KEY ("by3") REFERENCES "Aerolinea"("id_aerolinea") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinacionClientes" ADD CONSTRAINT "CoordinacionClientes_id_coordinacion_fkey" FOREIGN KEY ("id_coordinacion") REFERENCES "DocumentoCoordinacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinacionClientes" ADD CONSTRAINT "CoordinacionClientes_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Cliente"("id_clientes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaHija" ADD CONSTRAINT "GuiaHija_id_documento_coordinacion_fkey" FOREIGN KEY ("id_documento_coordinacion") REFERENCES "DocumentoCoordinacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaHija" ADD CONSTRAINT "GuiaHija_id_guia_madre_fkey" FOREIGN KEY ("id_guia_madre") REFERENCES "GuiaMadre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuiaHija" ADD CONSTRAINT "GuiaHija_id_finca_fkey" FOREIGN KEY ("id_finca") REFERENCES "Finca"("id_finca") ON DELETE RESTRICT ON UPDATE CASCADE;
