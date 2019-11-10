import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  const topic = process.env.TWITTER_TOPIC;
  twitterWorker.run(topic);
}

function swaggerSetup(app) {
  const options = new DocumentBuilder()
    .setTitle('Tweets API')
    .setDescription('Get tweet statistic from specific topic')
    .setVersion('1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('', app, document);
}

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  swaggerSetup(app);
  twitterWorkerSetup();

  await app.listen(process.env.PORT);
}
bootstrap();
