import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Domain, Level, Goal, Role } from '@repo/schema';
import bcrypt from 'bcrypt';
import { BaseDocument } from 'src/common/types/base-document.type';

const SALT_ROUNDS = 10;
export interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}
export type UserDocument = BaseDocument<User> & UserMethods;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: false })
  domain?: Domain;

  @Prop({ required: false })
  level?: Level;

  @Prop({ type: [String], default: [] })
  goals?: Goal[];

  @Prop({ required: false, min: 1 })
  dailyCommitment?: number;

  @Prop({ default: Role.USER })
  role!: Role;

  @Prop({ default: false })
  onboardingCompleted!: boolean;
}

export const UserEntity = SchemaFactory.createForClass(User);

// hooks to hash password
UserEntity.pre('save', async function (this: UserDocument) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

UserEntity.methods.comparePassword = async function (
  this: UserDocument,
  password: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(password, this.password);
};
