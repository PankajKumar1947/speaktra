import { z } from "zod";
import {
  DomainEnum,
  LevelEnum,
  GoalEnum,
  TimeCommitmentEnum,
} from "./profile.enum";

/**
 * User Profile Schema for Speaktra
 */
export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  domain: DomainEnum,
  level: LevelEnum,
  goals: z.array(GoalEnum),
  dailyCommitment: TimeCommitmentEnum,
  createdAt: z.date(),
  onboardingCompleted: z.boolean().default(false),
});
