import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty } from '@repo/schema';
import { HydratedDocument, Types } from 'mongoose';

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
  @Prop({ required: true, unique: true })
  word!: string;

  @Prop({ type: WordFormSchema, required: false })
  noun?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  verb?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  adjective?: WordForm;

  @Prop({ type: WordFormSchema, required: false })
  adverb?: WordForm;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Domain' })
  domainId!: Types.ObjectId;

  @Prop({ required: true, enum: Difficulty })
  difficulty!: string;
}

export const VocabularyEntity = SchemaFactory.createForClass(Vocabulary);
