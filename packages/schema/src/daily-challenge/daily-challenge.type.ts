import z from "zod";
import { Level } from "../common";
import { Domain } from "../domain";
import {
  CreateDailyChallengeSchema,
  UpdateDailyChallengeSchema,
} from "./daily-challenge.schema";

export type DailyChallenge = {
  _id: string;
  sequenceNumber: number;
  domain: Domain;
  level: Level;
  vocabularies: string[];
  sentences: string[];
  articles: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDailyChallenge = z.infer<typeof CreateDailyChallengeSchema>;
export type UpdateDailyChallenge = z.infer<typeof UpdateDailyChallengeSchema>;

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
