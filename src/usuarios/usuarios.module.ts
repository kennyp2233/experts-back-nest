// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
    providers: [UsuariosService, RolesService],
    controllers: [UsuariosController, RolesController],
    exports: [UsuariosService, RolesService],
})
export class UsuariosModule { }