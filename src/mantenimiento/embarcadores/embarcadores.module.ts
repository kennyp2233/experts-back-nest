// src/mantenimiento/embarcadores/embarcadores.module.ts
import { Module } from '@nestjs/common';
import { EmbarcadoresService } from './embarcadores.service';
import { EmbarcadoresController } from './embarcadores.controller';

@Module({
    controllers: [EmbarcadoresController],
    providers: [EmbarcadoresService],
    exports: [EmbarcadoresService],
})
export class EmbarcadoresModule { }