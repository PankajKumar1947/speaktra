import { UserProfile, Level, Goal } from "@repo/schema";

/**
 * Dummy user data for Pankaj
 * Corporate domain, Intermediate level
 */
export const DUMMY_USER: UserProfile = {
  id: "user_1",
  name: "Pankaj",
  email: "pankaj@example.com",
  domain: "Corporate",
  level: Level.INTERMEDIATE,
  goals: [Goal.FLUENCY, Goal.PRONUNCIATION, Goal.CONFIDENCE],
  createdAt: new Date("2026-01-01"),
  onboardingCompleted: true,
};
