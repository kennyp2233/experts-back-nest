// src/mantenimiento/bodegueros/bodegueros.module.ts
import { Module } from '@nestjs/common';
import { BodeguerosService } from './bodegueros.service';
import { BodeguerosController } from './bodegueros.controller';

@Module({
    controllers: [BodeguerosController],
    providers: [BodeguerosService],
    exports: [BodeguerosService],
})
export class BodeguerosModule { }