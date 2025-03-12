// src/mantenimiento/paises/paises.module.ts
import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';

@Module({
    controllers: [PaisesController],
    providers: [PaisesService],
    exports: [PaisesService],
})
export class PaisesModule { }