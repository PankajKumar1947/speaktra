import { z } from "zod";

/**
 * User Schema
 * Represents the full user entity as it exists in the database.
 */
export const UserSchema = z.object({
  id: z.number().int().positive().describe("The unique identifier of the user"),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .describe("The full name of the user (e.g. John Doe)"),
  age: z
    .number()
    .int()
    .positive({ message: "Age must be a positive number" })
    .describe("The age of the user in years"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .describe("The email address of the user"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the user was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the user was last updated"),
});

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

/**
 * Update User Schema
 * Validates the input for updating an existing user.
 * Partial of CreateUserSchema.
 */
export const UpdateUserSchema = CreateUserSchema.partial();
