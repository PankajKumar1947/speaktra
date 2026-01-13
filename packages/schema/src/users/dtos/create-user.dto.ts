import { z } from 'zod';
import { UserSchema } from '../schemas/user.schema';

/**
 * Create User Schema
 * Validates the input for creating a new user.
 * Omit system-generated fields like id, createdAt, updatedAt.
 */
export const CreateUserSchema = UserSchema.pick({
  name: true,
  age: true,
  email: true,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
