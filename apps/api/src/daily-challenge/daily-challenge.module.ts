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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyChallenge.name, schema: DailyChallengeEntity },
      { name: Domain.name, schema: DomainEntity },
      { name: Vocabulary.name, schema: VocabularyEntity },
      { name: Sentence.name, schema: SentenceEntity },
    ]),
  ],
  controllers: [DailyChallengeController],
  providers: [
    DailyChallengeService,
    AIContentGenerationService,
    DomainService,
    VocabularyService,
    SentenceService,
  ],
})
export class DailyChallengeModule {}
