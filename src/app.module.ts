import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    CommonModule,
    UsuariosModule,
    MantenimientoModule,
    // Agregar aquí otros módulos como CatalogosModule, DocumentosModule, etc.
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }