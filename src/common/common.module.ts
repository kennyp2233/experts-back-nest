// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AllExceptionsFilter } from './filters/prisma-exception.filter';

@Module({
    providers: [

        // El filtro de todas las excepciones con menor prioridad para capturar lo que no capture el filtro de Prisma
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
            // Menor prioridad para que sea un fallback
            inject: [{ token: 'FILTER_PRIORITY', optional: true }],
            useFactory: () => new AllExceptionsFilter(),
        },
        // El guard de roles sigue igual
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [],
})
export class CommonModule { }