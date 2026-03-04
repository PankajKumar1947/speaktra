import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Level } from '@repo/schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Article } from 'src/article/entities/article.entity';
import { Sentence } from 'src/sentence/entities/sentence.entity';
import { Vocabulary } from 'src/vocabulary/entities/vocabulary.entity';

export type DailyChallengeDocument = HydratedDocument<DailyChallenge>;

@Schema({ timestamps: true })
export class DailyChallenge {
  @Prop({ required: true })
  sequenceNumber!: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Domain' })
  domain!: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: Level })
  level!: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Vocabulary' })
  vocabularies!: Vocabulary[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Sentence' })
  sentences!: Sentence[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles!: Article[];
}

export const DailyChallengeEntity =
  SchemaFactory.createForClass(DailyChallenge);

DailyChallengeEntity.index(
  { sequenceNumber: 1, domain: 1, level: 1 },
  { unique: true },
);
