import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ZodValidationPipe } from './zod-validation.pipe';
import { SentenceModule } from './sentence/sentence.module';
import { ArticleModule } from './article/article.module';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { BullModule } from '@nestjs/bullmq';
import IORedis from 'ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
    ...(process.env.ENABLE_BULLMQ === 'true'
      ? [
          BullModule.forRoot({
            connection: new IORedis(process.env.UPSTASH_REDIS_URL!, {
              maxRetriesPerRequest: null,
              enableReadyCheck: false,
              family: 4,
              keepAlive: 30000,
              connectTimeout: 10000,
              retryStrategy: (times) => Math.min(times * 50, 2000),
              tls: process.env.UPSTASH_REDIS_URL?.startsWith('rediss://')
                ? {}
                : undefined,
            }),
          }),
        ]
      : []),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    UsersModule,
    AuthModule,
    DomainModule,
    VocabularyModule,
    SentenceModule,
    ArticleModule,
    DailyChallengeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
