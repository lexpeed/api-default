import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { LogLevel, Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      maxParamLength: 1000,
      bodyLimit: 12485760, // 10MB
    }),
  );
  const config = app.get(ConfigService);

  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'fatal'];
  if (config.get<boolean>('application.verbose')) {
    logLevels.push('verbose');
  }
  app.useLogger(logLevels);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  try {
    await app.listen(config.get<number>('application.port'), '0.0.0.0');
    Logger.log(`API listen on ${config.get<number>('application.port')}`);
  } catch (error) {
    Logger.error(error);
  }
}

bootstrap();
