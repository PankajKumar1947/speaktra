import { z } from "zod";
import { Difficulty, Level } from "../common";
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

export interface WordEntry {
  word: string;
  meaning: string;
}

export interface SelectedWord extends WordEntry {
  difficulty: Difficulty;
}

export interface DomainThemes {
  themes: string[];
}

export interface DifficultyBank {
  words: Record<string, WordEntry[]>;
}

export interface DailyWordSelection {
  theme: string;
  words: SelectedWord[];
}
