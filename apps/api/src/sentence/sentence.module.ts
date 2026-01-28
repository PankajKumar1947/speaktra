import { Module } from '@nestjs/common';
import { SentenceService } from './sentence.service';
import { SentenceController } from './sentence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sentence, SentenceEntity } from './entities/sentence.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sentence.name, schema: SentenceEntity },
    ]),
  ],
  controllers: [SentenceController],
  providers: [SentenceService],
  exports: [SentenceService],
})
export class SentenceModule {}
