import { z } from "zod";

// Learning goals enum (user-specific)
export const GoalEnum = z.enum([
  "fluency",
  "business_communication",
  "travel",
  "exam_preparation",
  "confidence_building",
  "pronunciation",
]);

// User role enum
export const RoleEnum = z.enum(["user", "admin", "premium"]);

// Re-export common types for convenience
export type { Domain, Level } from "../common";
export type Goal = z.infer<typeof GoalEnum>;
export type Role = z.infer<typeof RoleEnum>;
