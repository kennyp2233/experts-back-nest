import { Module } from '@nestjs/common';
import { FincasService } from './fincas.service';
import { FincasController } from './fincas.controller';

@Module({
    controllers: [FincasController],
    providers: [FincasService],
    exports: [FincasService],
})
export class FincasModule { }