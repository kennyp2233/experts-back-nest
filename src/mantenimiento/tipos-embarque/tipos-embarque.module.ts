// src/mantenimiento/tipos-embarque/tipos-embarque.module.ts
import { Module } from '@nestjs/common';
import { TiposEmbarqueService } from './tipos-embarque.service';
import { TiposEmbarqueController } from './tipos-embarque.controller';

@Module({
    controllers: [TiposEmbarqueController],
    providers: [TiposEmbarqueService],
    exports: [TiposEmbarqueService],
})
export class TiposEmbarqueModule { }