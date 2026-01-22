import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DomainDocument = HydratedDocument<Domain>;

@Schema({ timestamps: true })
export class Domain {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  // Timestamps (automatically added by { timestamps: true })
  createdAt?: Date;
  updatedAt?: Date;
}

export const DomainEntity = SchemaFactory.createForClass(Domain);
