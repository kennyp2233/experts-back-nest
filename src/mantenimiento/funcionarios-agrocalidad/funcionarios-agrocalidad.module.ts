// src/mantenimiento/funcionarios-agrocalidad/funcionarios-agrocalidad.module.ts
import { Module } from '@nestjs/common';
import { FuncionariosAgrocalidadService } from './funcionarios-agrocalidad.service';
import { FuncionariosAgrocalidadController } from './funcionarios-agrocalidad.controller';

@Module({
    controllers: [FuncionariosAgrocalidadController],
    providers: [FuncionariosAgrocalidadService],
    exports: [FuncionariosAgrocalidadService],
})
export class FuncionariosAgrocalidadModule { }