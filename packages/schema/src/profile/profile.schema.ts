import { z } from "zod";
import { DomainEnum, Level, LevelEnum, Goal, GoalEnum } from "../common";

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  domain: DomainEnum,
  level: LevelEnum,
  goals: z.array(GoalEnum),
  createdAt: z.date(),
  onboardingCompleted: z.boolean().default(false),
});

export const userGoals = [
  { value: Goal.FLUENCY, label: "Speak Fluently", icon: "chatbubbles" },
  {
    value: Goal.PRONUNCIATION,
    label: "Better Pronunciation",
    icon: "mic",
  },
  { value: Goal.VOCABULARY, label: "Expand Vocabulary", icon: "book" },
  { value: Goal.CONFIDENCE, label: "Build Confidence", icon: "trophy" },
  { value: Goal.GRAMMAR, label: "Improve Grammar", icon: "construct" },
];

export const userLevels = [
  {
    value: Level.BEGINNER,
    label: "Beginner",
    description: "Starting with basics, learning fundamentals",
  },
  {
    value: Level.INTERMEDIATE,
    label: "Intermediate",
    description: "Can communicate, improving fluency",
  },
  {
    value: Level.ADVANCED,
    label: "Advanced",
    description: "Fluent speaker, perfecting skills",
  },
];
