import { Module } from '@nestjs/common';
import { CatalogoProductoOpcionesService } from './opciones/catalogo-opciones.service';
import { CatalogoOpcionesController } from './opciones/catalogo-opciones.controller';
import { CatalogoProductoUnidadService } from './unidad/catalogo-unidad.service';
import { CatalogoUnidadController } from './unidad/catalogo-unidad.controller';

@Module({
    controllers: [CatalogoOpcionesController, CatalogoUnidadController],
    providers: [CatalogoProductoOpcionesService, CatalogoProductoUnidadService],
    exports: [CatalogoProductoOpcionesService, CatalogoProductoUnidadService],
})
export class ProductosModule { }