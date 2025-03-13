// src/documentos/documentos-base/documento-base.module.ts
import { Module } from '@nestjs/common';
import { DocumentoBaseService } from './documento-base.service';
import { DocumentoBaseController } from './documento-base.controller';
import { GuiaMadreModule } from '../guia-madre/guia-madre.module';

@Module({
    imports: [GuiaMadreModule],
    controllers: [DocumentoBaseController],
    providers: [DocumentoBaseService],
    exports: [DocumentoBaseService],
})
export class DocumentoBaseModule { }