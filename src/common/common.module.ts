// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { RolesGuard } from './guards/roles.guard';

@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: PrismaExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [],
})
export class CommonModule { }