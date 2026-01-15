import { UserProfile } from "@repo/schema";

/**
 * Dummy user data for Pankaj
 * Corporate domain, Intermediate level
 */
export const DUMMY_USER: UserProfile = {
  id: "user_1",
  name: "Pankaj",
  email: "pankaj@example.com",
  domain: "Corporate",
  level: "Intermediate",
  goals: ["Fluency", "Pronunciation", "Confidence"],
  dailyCommitment: "30",
  createdAt: new Date("2026-01-01"),
  onboardingCompleted: true,
};
