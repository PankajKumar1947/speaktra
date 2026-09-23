import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, RequestMethod } from '@nestjs/common';
import * as express from 'express';
import { serve } from 'inngest/express';
import { inngest } from './inngest/client';
import {
  createDailyLessonFunction,
  createScheduledDailyLessonFunction,
} from './daily-lesson/daily-lesson.inngest';
import { WordBankService } from './daily-lesson/word-bank.service';
import { DailyLessonService } from './daily-lesson/daily-lesson.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    origin: '*',
  });

  const wordBankService = app.get(WordBankService);
  const dailyLessonService = app.get(DailyLessonService);
  const dailyLessonFunction = createDailyLessonFunction(
    wordBankService,
    dailyLessonService,
  );
  const scheduledDailyLessonFunction =
    createScheduledDailyLessonFunction(dailyLessonService);

  app.use(
    '/api/inngest',
    express.json(),
    serve({
      client: inngest,
      functions: [dailyLessonFunction, scheduledDailyLessonFunction],
    }),
  );

  // versioning
  app.setGlobalPrefix('api', {
    exclude: [
      { path: '', method: RequestMethod.GET },
      { path: 'docs', method: RequestMethod.GET },
    ],
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Speaktra API')
    .setDescription('The Speaktra API description')
    .setVersion('1.0')
    .addServer(process.env.API_SERVER!)
    .addTag('users')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Bearer',
        description: 'Enter accessToken',
        in: 'header',
      },
      'JWT-auth', // This name here is important for reference in your controllers!
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
