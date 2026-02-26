import type { Domain, Level } from "../common";
import type { ProfileGoal } from "./profile.enum";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  domain: Domain;
  level: Level;
  goals: ProfileGoal[];
  createdAt: Date;
  onboardingCompleted: boolean;
}
