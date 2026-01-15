import { z } from "zod";

/**
 * Skill enum
 */
export const SkillEnum = z.enum([
  "Fluency",
  "Pronunciation",
  "Vocabulary",
  "Grammar",
  "Confidence",
]);

/**
 * Trend enum
 */
export const TrendEnum = z.enum(["up", "down", "stable"]);

export type Skill = z.infer<typeof SkillEnum>;
export type Trend = z.infer<typeof TrendEnum>;
