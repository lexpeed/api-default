import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

const mongoConfig = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => ({
  uri: configService.get<string>('database.url'),
});

export default mongoConfig;
