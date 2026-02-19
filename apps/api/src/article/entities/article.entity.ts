import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty } from '@repo/schema';
import { HydratedDocument, Types } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  minRead!: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Domain' })
  domainId!: Types.ObjectId;

  @Prop({ required: true, enum: Difficulty })
  difficulty!: string;

  @Prop({ required: false, type: [String] })
  keywords?: string[];

  @Prop({ required: true })
  description!: string;
}

export const ArticleEntity = SchemaFactory.createForClass(Article);
