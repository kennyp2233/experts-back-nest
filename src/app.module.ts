// Modificar src/app.module.ts:
import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
// Importar otros módulos según se vayan creando

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    CommonModule,
    // Otros módulos
  ],

})
export class AppModule { }