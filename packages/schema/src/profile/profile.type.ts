import type { Domain, Level, Goal, TimeCommitment } from "./profile.enum";

/**
 * User Profile Type for Speaktra
 */
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  domain: Domain;
  level: Level;
  goals: Goal[];
  dailyCommitment: TimeCommitment;
  createdAt: Date;
  onboardingCompleted: boolean;
}
