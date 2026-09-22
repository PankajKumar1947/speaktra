import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Domain, Level } from '@repo/schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Article } from 'src/article/entities/article.entity';
import { Sentence } from 'src/sentence/entities/sentence.entity';
import { Vocabulary } from 'src/vocabulary/entities/vocabulary.entity';

export type DailyLessonDocument = HydratedDocument<DailyLesson>;

@Schema({ timestamps: true })
export class DailyLesson {
  @Prop({ required: true })
  sequenceNumber!: number;

  @Prop({ required: true, type: String, enum: Domain })
  domain!: Domain;

  @Prop({ required: true, type: String, enum: Level })
  level!: Level;

  @Prop({ type: String, required: false })
  theme?: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Vocabulary' })
  vocabularies!: Vocabulary[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Sentence' })
  sentences!: Sentence[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Article' })
  articles!: Article[];
}

export const DailyLessonEntity = SchemaFactory.createForClass(DailyLesson);

DailyLessonEntity.index(
  { sequenceNumber: 1, domain: 1, level: 1 },
  { unique: true },
);
