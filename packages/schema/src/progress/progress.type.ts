import type { Skill, Trend } from "./progress.enum";

/**
 * Daily Activity Type
 */
export interface DailyActivity {
  date: Date;
  speakingMinutes: number;
  wordsLearned: number;
  sentencesCompleted: number;
  articlesRead: number;
}

/**
 * Progress Stats Type
 */
export interface ProgressStats {
  totalSpeakingMinutes: number;
  totalWordsLearned: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoalProgress: number;
  averageFluencyScore: number;
  activitiesByDate: DailyActivity[];
}

/**
 * Skill Progress Type
 */
export interface SkillProgress {
  skill: Skill;
  currentLevel: number;
  trend: Trend;
}
