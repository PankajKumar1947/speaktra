import { z } from "zod";
import { DomainEnum, LevelEnum } from "../common";
import { ProfileGoal, ProfileGoalEnum } from "./profile.enum";

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  domain: DomainEnum,
  level: LevelEnum,
  goals: z.array(ProfileGoalEnum),
  createdAt: z.date(),
  onboardingCompleted: z.boolean().default(false),
});

export const userGoals = [
  { value: ProfileGoal.FLUENCY, label: "Speak Fluently", icon: "chatbubbles" },
  {
    value: ProfileGoal.PRONUNCIATION,
    label: "Better Pronunciation",
    icon: "mic",
  },
  { value: ProfileGoal.VOCABULARY, label: "Expand Vocabulary", icon: "book" },
  { value: ProfileGoal.CONFIDENCE, label: "Build Confidence", icon: "trophy" },
  { value: ProfileGoal.GRAMMAR, label: "Improve Grammar", icon: "construct" },
];
