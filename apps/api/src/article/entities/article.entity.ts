import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty, Domain } from '@repo/schema';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  minRead!: number;

  @Prop({ required: true, type: String, enum: Domain })
  domain!: Domain;

  @Prop({ required: true, type: String, enum: Difficulty })
  difficulty!: string;

  @Prop({ required: false, type: [String] })
  keywords?: string[];

  @Prop({ required: true })
  description!: string;
}

export const ArticleEntity = SchemaFactory.createForClass(Article);
