import { z } from "zod";
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "./user.schema.js";

// TypeScript types inferred from Zod schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
