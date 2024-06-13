import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'http://localhost:3001', //--*
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type, Accept",
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({transform: true}));

    await app.listen(3000);
  } catch (error) {
  }
}
bootstrap();
