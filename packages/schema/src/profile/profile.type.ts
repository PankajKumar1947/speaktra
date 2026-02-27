import type { Level, Goal } from "../common";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  domain: string;
  level: Level;
  goals: Goal[];
  createdAt: Date;
  onboardingCompleted: boolean;
}
