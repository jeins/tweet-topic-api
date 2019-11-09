import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

import TwitterWorker from './TwitterWorker';
import { AppModule } from './app.module';

function twitterWorkerSetup() {
  const twitterWorker = new TwitterWorker(
    process.env.TWITTER_API_CONSUMER_KEY,
    process.env.TWITTER_API_CONSUMER_SECRET,
    process.env.TWITTER_API_TOKEN,
    process.env.TWITTER_API_TOKEN_SECRET,
  );

  const twitterTopic = process.env.TWITTER_TOPIC;
  twitterWorker.setTopic(twitterTopic);
  twitterWorker.recordData();
}

async function bootstrap() {
  config();
  twitterWorkerSetup();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
