import { z } from "zod";
import { Level } from "../common";
import { Domain } from "../domain";
import {
  CreateDailyLessonSchema,
  UpdateDailyLessonSchema,
} from "./daily-lesson.schema";

export type DailyLesson = {
  _id: string;
  sequenceNumber: number;
  domain: Domain;
  level: Level;
  theme?: string;
  vocabularies: string[];
  sentences: string[];
  articles: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDailyLesson = z.infer<typeof CreateDailyLessonSchema>;
export type UpdateDailyLesson = z.infer<typeof UpdateDailyLessonSchema>;

// Backward compatibility alias during migration
export type DailyChallenge = DailyLesson;
export type CreateDailyChallenge = CreateDailyLesson;
export type UpdateDailyChallenge = UpdateDailyLesson;

export interface WordEntry {
  word: string;
  meaning: string;
}

export interface WordBank {
  themes: string[];
  words: Record<string, WordEntry[]>;
}

export interface DailyWordSelection {
  theme: string;
  words: WordEntry[];
}
