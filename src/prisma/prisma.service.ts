// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Cannot clean database in production');
        }

        // Add truncation logic for testing purposes
        // This is useful for e2e tests
        const models = Reflect.ownKeys(this).filter(key =>
            key[0] !== '_' && key[0] !== '$' && typeof this[key] === 'object'
        );

        return Promise.all(
            models.map(modelKey => this[modelKey].deleteMany())
        );
    }
}