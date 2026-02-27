import z from "zod";
import { Difficulty, Level } from "../common";
import {
  CreateDailyChallengeSchema,
  UpdateDailyChallengeSchema,
} from "./daily-challenge.schema";

export type DailyChallenge = {
  _id: string;
  sequenceNumber: number;
  difficulty: Difficulty;
  level: Level;
  vocabularies: string[];
  sentences: string[];
  articles: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDailyChallenge = z.infer<typeof CreateDailyChallengeSchema>;
export type UpdateDailyChallenge = z.infer<typeof UpdateDailyChallengeSchema>;
