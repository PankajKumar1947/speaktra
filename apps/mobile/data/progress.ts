import { ProgressStats, SkillProgress } from "@repo/schema";

/**
 * Dummy progress statistics
 */
export const PROGRESS_DATA: ProgressStats = {
  totalSpeakingMinutes: 245,
  totalWordsLearned: 120,
  currentStreak: 7,
  longestStreak: 12,
  weeklyGoalProgress: 65,
  averageFluencyScore: 78,
  activitiesByDate: [
    {
      date: new Date("2026-01-15"),
      speakingMinutes: 30,
      wordsLearned: 8,
      sentencesCompleted: 5,
      articlesRead: 1,
    },
    {
      date: new Date("2026-01-14"),
      speakingMinutes: 25,
      wordsLearned: 12,
      sentencesCompleted: 6,
      articlesRead: 2,
    },
    {
      date: new Date("2026-01-13"),
      speakingMinutes: 35,
      wordsLearned: 15,
      sentencesCompleted: 8,
      articlesRead: 1,
    },
    {
      date: new Date("2026-01-12"),
      speakingMinutes: 40,
      wordsLearned: 10,
      sentencesCompleted: 7,
      articlesRead: 2,
    },
    {
      date: new Date("2026-01-11"),
      speakingMinutes: 30,
      wordsLearned: 18,
      sentencesCompleted: 5,
      articlesRead: 1,
    },
    {
      date: new Date("2026-01-10"),
      speakingMinutes: 45,
      wordsLearned: 20,
      sentencesCompleted: 9,
      articlesRead: 3,
    },
    {
      date: new Date("2026-01-09"),
      speakingMinutes: 40,
      wordsLearned: 22,
      sentencesCompleted: 10,
      articlesRead: 2,
    },
  ],
};

/**
 * Dummy skill progress data
 */
export const SKILL_PROGRESS_DATA: SkillProgress[] = [
  {
    skill: "Fluency",
    currentLevel: 78,
    trend: "up",
  },
  {
    skill: "Pronunciation",
    currentLevel: 82,
    trend: "up",
  },
  {
    skill: "Vocabulary",
    currentLevel: 65,
    trend: "stable",
  },
  {
    skill: "Grammar",
    currentLevel: 75,
    trend: "up",
  },
  {
    skill: "Confidence",
    currentLevel: 70,
    trend: "down",
  },
];
