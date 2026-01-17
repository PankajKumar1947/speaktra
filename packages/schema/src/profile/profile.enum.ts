import { z } from "zod";

// Learning goal enum (profile-specific)
export enum ProfileGoal {
  FLUENCY = "Fluency",
  PRONUNCIATION = "Pronunciation",
  VOCABULARY = "Vocabulary",
  CONFIDENCE = "Confidence",
  GRAMMAR = "Grammar",
}

// Time commitment options (in minutes)
export enum TimeCommitment {
  TEN = "10",
  TWENTY = "20",
  THIRTY = "30",
  FORTY_FIVE = "45",
}

// Zod schemas for validation
export const ProfileGoalEnum = z.nativeEnum(ProfileGoal);
export const TimeCommitmentEnum = z.nativeEnum(TimeCommitment);

// Re-export common types for convenience
export type { Domain, Level } from "../common";
