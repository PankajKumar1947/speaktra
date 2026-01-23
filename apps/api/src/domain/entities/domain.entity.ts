import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from 'src/common/types/base-document.type';

export type DomainDocument = BaseDocument<Domain>;

@Schema({ timestamps: true })
export class Domain {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: false })
  description?: string;
}

export const DomainEntity = SchemaFactory.createForClass(Domain);
