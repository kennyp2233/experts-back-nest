// src/mantenimiento/subagencias/subagencias.module.ts
import { Module } from '@nestjs/common';
import { SubAgenciasService } from './subagencias.service';
import { SubAgenciasController } from './subagencias.controller';

@Module({
    controllers: [SubAgenciasController],
    providers: [SubAgenciasService],
    exports: [SubAgenciasService],
})
export class SubAgenciasModule { }