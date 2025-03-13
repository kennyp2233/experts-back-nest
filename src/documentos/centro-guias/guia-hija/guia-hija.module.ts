// src/documentos/centro-guias/guia-hija/guia-hija.module.ts
import { Module } from '@nestjs/common';
import { GuiaHijaService } from './guia-hija.service';
import { GuiaHijaController } from './guia-hija.controller';

@Module({
    controllers: [GuiaHijaController],
    providers: [GuiaHijaService],
    exports: [GuiaHijaService],
})
export class GuiaHijaModule { }