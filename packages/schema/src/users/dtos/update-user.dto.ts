import { z } from 'zod';
import { CreateUserSchema } from './create-user.dto';

/**
 * Update User Schema
 * Validates the input for updating an existing user.
 * Partial of CreateUserSchema.
 */
export const UpdateUserSchema = CreateUserSchema.partial();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
