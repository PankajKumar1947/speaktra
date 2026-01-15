import { z } from "zod";
import { SkillEnum, TrendEnum } from "./progress.enum";

/**
 * Daily Activity Schema
 */
export const DailyActivitySchema = z.object({
  date: z.date(),
  speakingMinutes: z.number(),
  wordsLearned: z.number(),
  sentencesCompleted: z.number(),
  articlesRead: z.number(),
});

/**
 * Progress Stats Schema
 */
export const ProgressStatsSchema = z.object({
  totalSpeakingMinutes: z.number(),
  totalWordsLearned: z.number(),
  currentStreak: z.number(),
  longestStreak: z.number(),
  weeklyGoalProgress: z.number().min(0).max(100),
  averageFluencyScore: z.number().min(0).max(100),
  activitiesByDate: z.array(DailyActivitySchema),
});

/**
 * Skill Progress Schema
 */
export const SkillProgressSchema = z.object({
  skill: SkillEnum,
  currentLevel: z.number().min(0).max(100),
  trend: TrendEnum,
});
