import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyLessonService } from './daily-lesson.service';
import { DailyLessonController } from './daily-lesson.controller';
import { WordBankService } from './word-bank.service';
import { DailyLesson, DailyLessonEntity } from './entities/daily-lesson.entity';
import { DailyLessonRepository } from './daily-lesson.repository';
import { VocabularyModule } from 'src/vocabulary/vocabulary.module';
import { SentenceModule } from 'src/sentence/sentence.module';
import { ArticleModule } from 'src/article/article.module';
import { UsersModule } from 'src/users/users.module';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyLesson.name, schema: DailyLessonEntity },
    ]),
    VocabularyModule,
    SentenceModule,
    ArticleModule,
    UsersModule,
    DomainModule,
  ],
  controllers: [DailyLessonController],
  providers: [DailyLessonService, DailyLessonRepository, WordBankService],
  exports: [DailyLessonService, DailyLessonRepository, WordBankService],
})
export class DailyLessonModule {}
