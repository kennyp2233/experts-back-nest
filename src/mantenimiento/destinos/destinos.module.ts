// src/mantenimiento/destinos/destinos.module.ts
import { Module } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { DestinosController } from './destinos.controller';

@Module({
    controllers: [DestinosController],
    providers: [DestinosService],
    exports: [DestinosService],
})
export class DestinosModule { }