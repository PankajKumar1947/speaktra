import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Difficulty, Domain } from '@repo/schema';
import { HydratedDocument } from 'mongoose';

export type SentenceDocument = HydratedDocument<Sentence>;

@Schema({ timestamps: true })
export class Sentence {
  @Prop({ required: true })
  sentence!: string;

  @Prop({
    required: false,
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return !v || v.length <= 2;
      },
      message: 'otherWays array can contain maximum 2 alternatives',
    },
  })
  otherWays?: string[];

  @Prop({ required: true })
  context!: string;

  @Prop({ required: true })
  explanation!: string;

  @Prop({ required: true, type: String, enum: Domain })
  domain!: Domain;

  @Prop({ required: true, type: String, enum: Difficulty })
  difficulty!: string;
}

export const SentenceEntity = SchemaFactory.createForClass(Sentence);
