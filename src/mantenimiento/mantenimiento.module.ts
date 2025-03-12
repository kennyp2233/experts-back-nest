import { Module } from '@nestjs/common';
// Importa otros módulos de mantenimiento según los vayas creando
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
@Module({
    imports: [
        AerolineasModule,
        ClientesModule,
        ProductosModule
        // Otros módulos de mantenimiento
    ],
    exports: [
        // Exporta también los otros módulos
    ],
})
export class MantenimientoModule { }