import { Module } from '@nestjs/common';
import { AerolineasController } from './aerolineas.controller';
import { AerolineasService } from './aerolineas.service';
// Importa otros módulos de mantenimiento según los vayas creando

@Module({
    controllers: [AerolineasController],
    providers: [AerolineasService],
    exports: [
        AerolineasService
    ],
})
export class AerolineasModule { }