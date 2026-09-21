import type { Level, Goal } from "../common";
import type { Domain } from "../domain/domain.schema";

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
