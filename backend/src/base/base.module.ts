import { Module } from '@nestjs/common';
import * as controllers from './controllers/test.controller';

@Module({
  controllers: Object.values(controllers),
})
export class BaseModule {}