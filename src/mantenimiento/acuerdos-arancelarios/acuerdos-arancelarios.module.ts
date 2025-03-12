// src/mantenimiento/acuerdos-arancelarios/acuerdos-arancelarios.module.ts
import { Module } from '@nestjs/common';
import { AcuerdosArancelariosService } from './acuerdos-arancelarios.service';
import { AcuerdosArancelariosController } from './acuerdos-arancelarios.controller';

@Module({
  controllers: [AcuerdosArancelariosController],
  providers: [AcuerdosArancelariosService],
  exports: [AcuerdosArancelariosService],
})
export class AcuerdosArancelariosModule {}