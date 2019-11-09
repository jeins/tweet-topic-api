import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import TweetModule from './tweet';

@Module({
  imports: [TweetModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
