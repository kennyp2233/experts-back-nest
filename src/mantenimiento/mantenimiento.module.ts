// src/mantenimiento/mantenimiento.module.ts
import { Module } from '@nestjs/common';
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { FincasModule } from './fincas/fincas.module';
import { ConsignatariosModule } from './consignatarios/consignatarios.module';
import { OrigenesModule } from './origenes/origenes.module';
import { DestinosModule } from './destinos/destinos.module';

@Module({
    imports: [
        AerolineasModule,
        ClientesModule,
        ProductosModule,
        FincasModule,
        ConsignatariosModule,
        OrigenesModule,
        DestinosModule,
        // Otros módulos de mantenimiento
    ],
    exports: [
        AerolineasModule,
        ClientesModule,
        ProductosModule,
        FincasModule,
        ConsignatariosModule,
        OrigenesModule,
        DestinosModule,
        // Exporta también los otros módulos
    ],
})
export class MantenimientoModule { }