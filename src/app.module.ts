import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import envConfig from './configs/env.config';
import mongoConfig from './configs/mongo.config';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    {
      ...ConfigModule.forRoot({ load: [envConfig] }),
      global: true,
    },
    {
      ...MongooseModule.forRootAsync({
        useFactory: async (configService: ConfigService) =>
          mongoConfig(configService),
        inject: [ConfigService],
      }),
      global: true,
    },
    HealthModule,
  ],
})
export class AppModule {}
