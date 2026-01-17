import { z } from "zod";

/**
 * Skill enum
 */
export enum Skill {
  FLUENCY = "Fluency",
  PRONUNCIATION = "Pronunciation",
  VOCABULARY = "Vocabulary",
  GRAMMAR = "Grammar",
  CONFIDENCE = "Confidence",
}

/**
 * Trend enum
 */
export enum Trend {
  UP = "up",
  DOWN = "down",
  STABLE = "stable",
}

// Zod schemas for validation
export const SkillEnum = z.nativeEnum(Skill);
export const TrendEnum = z.nativeEnum(Trend);
