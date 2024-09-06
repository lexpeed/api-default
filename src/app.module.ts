import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import envConfig from './configs/env.config';
import mongoConfig from './configs/mongo.config';
import { HealthModule } from './modules/health/health.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ActivityModule } from './modules/activity/activity.module';

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
    QuestionsModule,
    ActivityModule,
  ],
})
export class AppModule {}
