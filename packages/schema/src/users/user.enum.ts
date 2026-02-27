import { z } from "zod";

// User role enum
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// Zod schemas for validation
export const RoleEnum = z.nativeEnum(Role);

export { LevelEnum, GoalEnum } from "../common";
