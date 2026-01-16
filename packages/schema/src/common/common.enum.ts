import { z } from "zod";

// Professional domain/sector enum (unified from users & profile)
export const DomainEnum = z.enum([
  "business",
  "technology",
  "healthcare",
  "education",
  "travel",
  "legal",
  "hospitality",
  "corporate",
  "it",
  "other",
]);

// Proficiency level enum
export const LevelEnum = z.enum(["beginner", "intermediate", "advanced"]);

// Difficulty level enum (shared by practice & speaking)
export const DifficultyEnum = z.enum(["easy", "medium", "hard"]);

export type Domain = z.infer<typeof DomainEnum>;
export type Level = z.infer<typeof LevelEnum>;
export type Difficulty = z.infer<typeof DifficultyEnum>;
