import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import type { Domain, Level, Goal, Role } from '@repo/schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  domain!: Domain;

  @Prop({ required: true })
  level!: Level;

  @Prop({ type: [String], default: [] })
  goals!: Goal[];

  @Prop({ required: true, min: 1 })
  dailyCommitment!: number;

  @Prop({ default: 'user' })
  role!: Role;

  // Timestamps (automatically added by { timestamps: true })
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserEntity = SchemaFactory.createForClass(User);
