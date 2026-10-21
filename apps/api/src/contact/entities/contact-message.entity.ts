import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ContactMessageStatus, ContactTopic } from '@repo/schema';
import { HydratedDocument } from 'mongoose';

export type ContactMessageDocument = HydratedDocument<ContactMessage>;

@Schema({ timestamps: true })
export class ContactMessage {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, type: String, enum: ContactTopic })
  topic!: ContactTopic;

  @Prop({ required: true })
  subject!: string;

  @Prop({ required: true })
  message!: string;

  @Prop({
    required: true,
    type: String,
    enum: ContactMessageStatus,
    default: ContactMessageStatus.NEW,
  })
  status!: ContactMessageStatus;
}

export const ContactMessageEntity =
  SchemaFactory.createForClass(ContactMessage);

ContactMessageEntity.index({ createdAt: -1 });
