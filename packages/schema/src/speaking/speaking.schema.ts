import { z } from "zod";
import { SpeakingDifficultyEnum } from "./speaking.enum";

/**
 * Speaking Scenario Schema
 */
export const SpeakingScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
  domain: z.string(),
  difficulty: SpeakingDifficultyEnum,
  suggestedDuration: z.number(), // in seconds
});

/**
 * Speaking Recording Schema
 */
export const SpeakingRecordingSchema = z.object({
  id: z.string(),
  scenarioId: z.string(),
  duration: z.number(), // in seconds
  recordedAt: z.date(),
  transcription: z.string().optional(),
});

/**
 * Speaking Feedback Schema
 */
export const SpeakingFeedbackSchema = z.object({
  id: z.string(),
  recordingId: z.string(),
  fluencyScore: z.number().min(0).max(100),
  pronunciationScore: z.number().min(0).max(100),
  grammarScore: z.number().min(0).max(100),
  overallScore: z.number().min(0).max(100),
  suggestions: z.array(z.string()),
  strengths: z.array(z.string()),
  areasToImprove: z.array(z.string()),
});
