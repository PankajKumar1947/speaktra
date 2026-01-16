import { z } from "zod";

// Learning goal enum (profile-specific)
export const ProfileGoalEnum = z.enum([
  "Fluency",
  "Pronunciation",
  "Vocabulary",
  "Confidence",
  "Grammar",
]);

// Time commitment options (in minutes)
export const TimeCommitmentEnum = z.enum(["10", "20", "30", "45"]);

// Re-export common types for convenience
export type { Domain, Level } from "../common";
export type ProfileGoal = z.infer<typeof ProfileGoalEnum>;
export type TimeCommitment = z.infer<typeof TimeCommitmentEnum>;
