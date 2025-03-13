// src/documentos/centro-guias/coordinacion/coordinacion.module.ts
import { Module } from '@nestjs/common';
import { CoordinacionService } from './coordinacion.service';
import { CoordinacionController } from './coordinacion.controller';
@Module({
    controllers: [CoordinacionController],
    providers: [CoordinacionService],
    exports: [CoordinacionService],
})
export class CoordinacionModule { }