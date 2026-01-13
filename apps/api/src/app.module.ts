import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

@Module({
  imports: [UsersModule],
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
export class AppModule { }
