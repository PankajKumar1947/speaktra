import { z } from "zod";

// Professional domain/sector enum (unified from users & profile)
export enum Domain {
  BUSINESS = "business",
  TECHNOLOGY = "technology",
  HEALTHCARE = "healthcare",
  EDUCATION = "education",
  TRAVEL = "travel",
  LEGAL = "legal",
  HOSPITALITY = "hospitality",
  CORPORATE = "corporate",
  IT = "it",
  OTHER = "other",
}

// Proficiency level enum
export enum Level {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

// Difficulty level enum (shared by practice & speaking)
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// Zod schemas for validation (derived from enums)
export const DomainEnum = z.nativeEnum(Domain);
export const LevelEnum = z.nativeEnum(Level);
export const DifficultyEnum = z.nativeEnum(Difficulty);
