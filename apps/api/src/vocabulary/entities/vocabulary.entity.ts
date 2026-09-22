import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty, Domain } from '@repo/schema';
import { HydratedDocument } from 'mongoose';

export type VocabularyDocument = HydratedDocument<Vocabulary>;

// Word form subdocument schema
@Schema({ _id: false })
export class WordForm {
  @Prop({ required: true })
  meaning!: string;

  @Prop({ required: false })
  example?: string;
}

const WordFormSchema = SchemaFactory.createForClass(WordForm);

@Schema({ timestamps: true })
export class Vocabulary {
  @Prop({ required: true })
  word!: string;

  @Prop({ type: WordFormSchema, required: false })
  noun?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  verb?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  adjective?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  adverb?: WordForm;

  @Prop({ required: true, type: String, enum: Domain })
  domain!: Domain;

  @Prop({ required: true, type: String, enum: Difficulty })
  difficulty!: string;
}

export const VocabularyEntity = SchemaFactory.createForClass(Vocabulary);
VocabularyEntity.index({ domain: 1, word: 1 }, { unique: true });
