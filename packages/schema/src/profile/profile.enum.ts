import { z } from "zod";

// Learning goal enum (profile-specific)
export enum ProfileGoal {
  FLUENCY = "Fluency",
  PRONUNCIATION = "Pronunciation",
  VOCABULARY = "Vocabulary",
  CONFIDENCE = "Confidence",
  GRAMMAR = "Grammar",
}

// Zod schemas for validation
export const ProfileGoalEnum = z.nativeEnum(ProfileGoal);

// Re-export common types for convenience
export type { Domain, Level } from "../common";
