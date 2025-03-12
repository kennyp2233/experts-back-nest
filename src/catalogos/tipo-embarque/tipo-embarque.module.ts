import { Module } from '@nestjs/common';
import { TipoCargaService } from './carga/tipo-carga.service';
import { TipoCargaController } from './carga/tipo-carga.controller';
import { TipoEmbalajeService } from './embalaje/tipo-embalaje.service';
import { TipoEmbalajeController } from './embalaje/tipo-embalaje.controller';

@Module({
    controllers: [TipoCargaController, TipoEmbalajeController],
    providers: [TipoCargaService, TipoEmbalajeService],
    exports: [TipoCargaService, TipoEmbalajeService],
})
export class TipoEmbarqueModule { }