import { z } from "zod";

/**
 * Domain enum for professional sectors
 */
export const DomainEnum = z.enum([
  "Corporate",
  "Healthcare",
  "IT",
  "Legal",
  "Hospitality",
]);

/**
 * Proficiency level enum
 */
export const LevelEnum = z.enum(["Beginner", "Intermediate", "Advanced"]);

/**
 * Learning goal enum
 */
export const GoalEnum = z.enum([
  "Fluency",
  "Pronunciation",
  "Vocabulary",
  "Confidence",
  "Grammar",
]);

/**
 * Time commitment options (in minutes)
 */
export const TimeCommitmentEnum = z.enum(["10", "20", "30", "45"]);

export type Domain = z.infer<typeof DomainEnum>;
export type Level = z.infer<typeof LevelEnum>;
export type Goal = z.infer<typeof GoalEnum>;
export type TimeCommitment = z.infer<typeof TimeCommitmentEnum>;
