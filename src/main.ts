import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,  // Allow credentials
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true, // 🔥 Convierte automáticamente string a número si el DTO lo espera
    },
    exceptionFactory: (errors) => {
      console.error('Errores de validación:', errors);
      return new BadRequestException(errors);
    },


  }));
  app.setGlobalPrefix('api/v1');
  await app.listen(3001);
}
bootstrap();