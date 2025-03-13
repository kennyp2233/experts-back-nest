// src/documentos/documentos-base/guia-madre/guia-madre.module.ts
import { Module } from '@nestjs/common';
import { GuiaMadreService } from './guia-madre.service';
import { GuiaMadreController } from './guia-madre.controller';

@Module({
    controllers: [GuiaMadreController],
    providers: [GuiaMadreService],
    exports: [GuiaMadreService],
})
export class GuiaMadreModule { }