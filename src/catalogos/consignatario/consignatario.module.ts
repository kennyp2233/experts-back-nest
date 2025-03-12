import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento/tipo-documento.service';
import { TipoDocumentoController } from './tipo-documento/tipo-documento.controller';

@Module({
    controllers: [TipoDocumentoController],
    providers: [TipoDocumentoService],
    exports: [TipoDocumentoService],
})
export class ConsignatarioModule { }