import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    origin: '*',
  });

  // versioning
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
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
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
