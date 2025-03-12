// src/mantenimiento/cae-aduanas/cae-aduanas.module.ts
import { Module } from '@nestjs/common';
import { CaeAduanasService } from './cae-aduanas.service';
import { CaeAduanasController } from './cae-aduanas.controller';

@Module({
    controllers: [CaeAduanasController],
    providers: [CaeAduanasService],
    exports: [CaeAduanasService],
})
export class CaeAduanasModule { }