import { z } from "zod";
import { DomainEnum, LevelEnum } from "../common";
import { GoalEnum, Role, RoleEnum } from "./user.enum";

// Full user entity schema as it exists in the database
export const UserSchema = z.object({
  id: z
    .string()
    .describe("The unique identifier of the user (MongoDB ObjectId)"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .describe("The email address of the user"),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .describe("The full name of the user"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .describe("The hashed password of the user"),
  domain: z.string().describe("The professional domain/sector of the user"),
  level: LevelEnum.describe("The proficiency level of the user"),
  goals: z
    .array(GoalEnum)
    .default([])
    .describe("The learning goals of the user"),
  dailyCommitment: z
    .number()
    .int()
    .min(1, { message: "Daily commitment must be at least 1 minute" })
    .describe("Daily commitment in minutes"),
  role: RoleEnum.default(Role.USER).describe("The role of the user"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the user was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the user was last updated"),
});

// Schema for creating a new user (omits system-generated fields)
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a user (partial with no system fields)
export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Schema for completing user onboarding
export const CompleteOnboardingSchema = z.object({
  domain: DomainEnum.describe("The professional domain/sector of the user"),
  level: LevelEnum.describe("The proficiency level of the user"),
  goals: z
    .array(GoalEnum)
    .min(1, { message: "At least one learning goal is required" })
    .describe("The learning goals of the user"),
  dailyCommitment: z
    .number()
    .int()
    .min(1, { message: "Daily commitment must be at least 1 minute" })
    .optional()
    .describe("Daily commitment in minutes (optional)"),
});
