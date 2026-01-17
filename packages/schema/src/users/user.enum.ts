import { z } from "zod";

// Learning goals enum (user-specific)
export enum Goal {
  FLUENCY = "fluency",
  BUSINESS_COMMUNICATION = "business_communication",
  TRAVEL = "travel",
  EXAM_PREPARATION = "exam_preparation",
  CONFIDENCE_BUILDING = "confidence_building",
  PRONUNCIATION = "pronunciation",
}

// User role enum
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// Zod schemas for validation
export const GoalEnum = z.nativeEnum(Goal);
export const RoleEnum = z.nativeEnum(Role);

// Re-export common types for convenience
export type { Domain, Level } from "../common";
