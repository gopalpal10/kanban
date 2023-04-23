import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    //database connection : connecting with postgresql
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'India@11',
      database: 'kanban',
      autoLoadEntities: true,
      synchronize: true

    }),
    //user module for user ended api
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
