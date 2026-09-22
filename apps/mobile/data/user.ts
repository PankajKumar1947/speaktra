import { UserProfile, Level, Goal, Domain } from "@repo/schema";

/**
 * Dummy user data for Pankaj
 * Business domain, Intermediate level
 */
export const DUMMY_USER: UserProfile = {
  id: "user_1",
  name: "Pankaj",
  email: "pankaj@example.com",
  domain: Domain.BUSINESS,
  level: Level.INTERMEDIATE,
  goals: [Goal.FLUENCY, Goal.PRONUNCIATION, Goal.CONFIDENCE],
  createdAt: new Date("2026-01-01"),
  onboardingCompleted: true,
};
