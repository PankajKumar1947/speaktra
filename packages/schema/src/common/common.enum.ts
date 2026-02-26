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

// Unified Learning Goal enum
export enum Goal {
  FLUENCY = "fluency",
  PRONUNCIATION = "pronunciation",
  VOCABULARY = "vocabulary",
  CONFIDENCE = "confidence",
  GRAMMAR = "grammar",
  BUSINESS_COMMUNICATION = "business_communication",
  TRAVEL = "travel",
  EXAM_PREPARATION = "exam_preparation",
}

// Zod schemas for validation (derived from enums)
export const DomainEnum = z.nativeEnum(Domain);
export const LevelEnum = z.nativeEnum(Level);
export const DifficultyEnum = z.nativeEnum(Difficulty);
export const GoalEnum = z.nativeEnum(Goal);
