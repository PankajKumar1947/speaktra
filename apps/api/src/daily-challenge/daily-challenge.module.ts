import { Module } from '@nestjs/common';
import { DailyChallengeService } from './daily-challenge.service';
import { DailyChallengeController } from './daily-challenge.controller';
import { AIContentGenerationService } from './ai-content-generation.service';
import { VocabularyService } from 'src/vocabulary/vocabulary.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DailyChallenge,
  DailyChallengeEntity,
} from './entities/daily-challenge.entity';
import { DomainService } from 'src/domain/domain.service';
import { Domain } from 'domain';
import { DomainEntity } from 'src/domain/entities/domain.entity';
import {
  Vocabulary,
  VocabularyEntity,
} from 'src/vocabulary/entities/vocabulary.entity';
import { SentenceService } from 'src/sentence/sentence.service';
import {
  Sentence,
  SentenceEntity,
} from 'src/sentence/entities/sentence.entity';
import { Article, ArticleEntity } from 'src/article/entities/article.entity';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';
import { User, UserEntity } from 'src/users/entities/user.entity';
import { DailyChallengeProcessor } from './daily-challenge.processor';
import { BullModule, getQueueToken } from '@nestjs/bullmq';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyChallenge.name, schema: DailyChallengeEntity },
      { name: Domain.name, schema: DomainEntity },
      { name: Vocabulary.name, schema: VocabularyEntity },
      { name: Sentence.name, schema: SentenceEntity },
      { name: Article.name, schema: ArticleEntity },
      { name: User.name, schema: UserEntity },
    ]),
    ...(process.env.ENABLE_BULLMQ === 'true'
      ? [
          BullModule.registerQueue({
            name: 'daily-challenge',
          }),
        ]
      : []),
  ],
  controllers: [DailyChallengeController],
  providers: [
    DailyChallengeService,
    AIContentGenerationService,
    DomainService,
    VocabularyService,
    SentenceService,
    ArticleService,
    UsersService,
    ...(process.env.ENABLE_BULLMQ === 'true'
      ? [DailyChallengeProcessor]
      : [
          {
            provide: getQueueToken('daily-challenge'),
            useValue: { add: () => ({ id: 'mock-id' }) },
          },
        ]),
  ],
})
export class DailyChallengeModule {}
