// src/documentos/documentos.module.ts
import { Module } from '@nestjs/common';
import { DocumentoBaseModule } from './documentos-base/documento-base.module';
import { CoordinacionModule } from './centro-guias/coordinacion/coordinacion.module';
import { GuiaHijaModule } from './centro-guias/guia-hija/guia-hija.module';

@Module({
    imports: [
        DocumentoBaseModule,
        CoordinacionModule,
        GuiaHijaModule,
    ],
    exports: [
        DocumentoBaseModule,
        CoordinacionModule,
        GuiaHijaModule,
    ],
})
export class DocumentosModule { }