// src/mantenimiento/consignatarios/consignatarios.module.ts
import { Module } from '@nestjs/common';
import { ConsignatariosService } from './consignatarios.service';
import { ConsignatariosController } from './consignatarios.controller';

@Module({
    controllers: [ConsignatariosController],
    providers: [ConsignatariosService],
    exports: [ConsignatariosService],
})
export class ConsignatariosModule { }