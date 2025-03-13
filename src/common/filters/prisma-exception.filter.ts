// src/common/filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Registrar el error completo en la consola
        this.logger.error(`
      Status: ${status}
      Path: ${request.url}
      Method: ${request.method}
      Error: ${exception.message}
      Stack: ${exception.stack}
    `);

        // Respuesta al cliente (más limitada)
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : exception.message,
        });
    }
}