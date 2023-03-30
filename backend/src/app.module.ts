import { BaseModule } from './base/base.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './base';

@Module({
  imports: [BaseModule],
  controllers: [AppController,TestController],
  providers: [AppService],
})
export class AppModule {}
