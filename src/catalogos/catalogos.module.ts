import { Module } from '@nestjs/common';
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { ProductosModule } from './productos/productos.module';
import { TipoEmbarqueModule } from './tipo-embarque/tipo-embarque.module';
import { ConsignatarioModule } from './consignatario/consignatario.module';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
    imports: [
        AerolineasModule,
        ProductosModule,
        TipoEmbarqueModule,
        ConsignatarioModule,
        DocumentosModule,
    ],
    exports: [
        AerolineasModule,
        ProductosModule,
        TipoEmbarqueModule,
        ConsignatarioModule,
        DocumentosModule,
    ],
})
export class CatalogosModule { }