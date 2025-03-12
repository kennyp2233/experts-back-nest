// src/mantenimiento/origenes/origenes.module.ts
import { Module } from '@nestjs/common';
import { OrigenesService } from './origenes.service';
import { OrigenesController } from './origenes.controller';

@Module({
    controllers: [OrigenesController],
    providers: [OrigenesService],
    exports: [OrigenesService],
})
export class OrigenesModule { }