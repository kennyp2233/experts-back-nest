import { Module } from '@nestjs/common';
import { DocumentoBaseStockService } from './stock/documento-base-stock.service';
import { DocumentoBaseStockController } from './stock/documento-base-stock.controller';

@Module({
    controllers: [DocumentoBaseStockController],
    providers: [DocumentoBaseStockService],
    exports: [DocumentoBaseStockService],
})
export class DocumentosModule { }