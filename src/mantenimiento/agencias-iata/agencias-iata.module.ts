// src/mantenimiento/agencias-iata/agencias-iata.module.ts
import { Module } from '@nestjs/common';
import { AgenciasIataService } from './agencias-iata.service';
import { AgenciasIataController } from './agencias-iata.controller';

@Module({
    controllers: [AgenciasIataController],
    providers: [AgenciasIataService],
    exports: [AgenciasIataService],
})
export class AgenciasIataModule { }