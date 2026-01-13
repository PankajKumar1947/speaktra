import { z } from 'zod';

/**
 * User Schema
 * Represents the full user entity as it exists in the database.
 */
export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  age: z.number().int().positive({ message: "Age must be a positive number" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
