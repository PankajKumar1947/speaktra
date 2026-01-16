import type { Domain, Level } from "../common";
import type { ProfileGoal, TimeCommitment } from "./profile.enum";

/**
 * User Profile Type for Speaktra
 */
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  domain: Domain;
  level: Level;
  goals: ProfileGoal[];
  dailyCommitment: TimeCommitment;
  createdAt: Date;
  onboardingCompleted: boolean;
}
