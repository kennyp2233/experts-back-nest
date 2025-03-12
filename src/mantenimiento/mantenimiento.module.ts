// src/mantenimiento/mantenimiento.module.ts
import { Module } from '@nestjs/common';
import { AerolineasModule } from './aerolineas/aerolineas.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { FincasModule } from './fincas/fincas.module';
import { ConsignatariosModule } from './consignatarios/consignatarios.module';
import { OrigenesModule } from './origenes/origenes.module';
import { DestinosModule } from './destinos/destinos.module';
import { AcuerdosArancelariosModule } from './acuerdos-arancelarios/acuerdos-arancelarios.module';
import { BodeguerosModule } from './bodegueros/bodegueros.module';
import { CaeAduanasModule } from './cae-aduanas/cae-aduanas.module';
import { ChoferesModule } from './choferes/choferes.module';
import { EmbarcadoresModule } from './embarcadores/embarcadores.module';
import { FuncionariosAgrocalidadModule } from './funcionarios-agrocalidad/funcionarios-agrocalidad.module';
import { TiposEmbarqueModule } from './tipos-embarque/tipos-embarque.module';
import { SubAgenciasModule } from './subagencias/subagencias.module';
import { PaisesModule } from './paises/paises.module';
import { AgenciasIataModule } from './agencias-iata/agencias-iata.module';

@Module({
    imports: [
        AerolineasModule,
        ClientesModule,
        ProductosModule,
        FincasModule,
        ConsignatariosModule,
        OrigenesModule,
        DestinosModule,
        AcuerdosArancelariosModule,
        BodeguerosModule,
        CaeAduanasModule,
        ChoferesModule,
        EmbarcadoresModule,
        FuncionariosAgrocalidadModule,
        TiposEmbarqueModule,
        SubAgenciasModule,
        PaisesModule,
        AgenciasIataModule
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
        AcuerdosArancelariosModule,
        BodeguerosModule,
        CaeAduanasModule,
        ChoferesModule,
        EmbarcadoresModule,
        FuncionariosAgrocalidadModule,
        TiposEmbarqueModule,
        SubAgenciasModule,
        PaisesModule,
        AgenciasIataModule
        // Exporta también los otros módulos
    ],
})
export class MantenimientoModule { }