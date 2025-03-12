import { Module } from '@nestjs/common';
import { CatalogoModoService } from './modo/catalogo-modo.service';
import { CatalogoModoController } from './modo/catalogo-modo.controller';
import { CatalogoMultiplicadorService } from './multiplicador/catalogo-multiplicador.service';
import { CatalogoMultiplicadorController } from './multiplicador/catalogo-multiplicador.controller';

@Module({
    controllers: [CatalogoModoController, CatalogoMultiplicadorController],
    providers: [CatalogoModoService, CatalogoMultiplicadorService],
    exports: [CatalogoModoService, CatalogoMultiplicadorService],
})
export class AerolineasModule { }