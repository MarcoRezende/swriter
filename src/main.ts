import 'dotenv/config';

import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(process.env.API_PORT);
}

bootstrap();
