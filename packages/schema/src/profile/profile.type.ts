import type { Domain, Level, Goal } from "../common";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  domain: Domain;
  level: Level;
  goals: Goal[];
  createdAt: Date;
  onboardingCompleted: boolean;
}
