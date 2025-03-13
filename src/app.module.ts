// src/app.module.ts (actualización)
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { DocumentosModule } from './documentos/documentos.module'; // Nuevo módulo
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthRefreshMiddleware } from './auth/middleware/auth-refresh.middleware';
import { AllExceptionsFilter } from './common/filters/prisma-exception.filter';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UsuariosModule,
    MantenimientoModule,
    CatalogosModule,
    DocumentosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthRefreshMiddleware)
      .forRoutes('*');
  }
}