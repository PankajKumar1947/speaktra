import { z } from "zod";

// User role enum
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// Zod schemas for validation
export const RoleEnum = z.nativeEnum(Role);

// Re-export common types for convenience
export type { Domain, Level, Goal } from "../common";
export { LevelEnum, GoalEnum } from "../common";
