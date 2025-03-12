// src/common/filters/prisma-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        switch (exception.code) {
            case 'P2002': // Unique constraint failed
                status = HttpStatus.CONFLICT;
                message = 'Unique constraint failed on one or more fields';
                break;
            case 'P2025': // Record not found
                status = HttpStatus.NOT_FOUND;
                message = 'Record not found';
                break;
            // Add more cases as needed
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}