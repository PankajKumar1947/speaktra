import { z } from "zod";
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  CompleteOnboardingSchema,
} from "./user.schema.js";

// TypeScript types inferred from Zod schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type CompleteOnboarding = z.infer<typeof CompleteOnboardingSchema>;
