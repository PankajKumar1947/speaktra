import { z } from "zod";
import { DifficultyEnum, LevelEnum } from "../common/common.enum";

/**
 * Daily Challenge Schema
 */
export const DailyChallengeSchema = z.object({
  id: z.string().describe("The unique identifier of the daily challenge"),
  sequenceNumber: z
    .number()
    .positive()
    .describe("The sequence number of the daily challenge"),
  domain: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "domain must be a valid MongoDB ObjectId",
    })
    .describe("Reference to the domain this daily challenge belongs to"),
  difficulty: DifficultyEnum.describe(
    "Difficulty level of the daily challenge",
  ),
  level: LevelEnum.describe("Proficiency level of the daily challenge"),
  vocabularies: z
    .array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "vocabulary id must be a valid MongoDB ObjectId",
      }),
    )
    .optional()
    .describe("Array of vocabulary ObjectIds"),
  sentences: z
    .array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "sentence id must be a valid MongoDB ObjectId",
      }),
    )
    .optional()
    .describe("Array of sentence ObjectIds"),
  articles: z
    .array(
      z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "article id must be a valid MongoDB ObjectId",
      }),
    )
    .optional()
    .describe("Array of article ObjectIds"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the daily challenge was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the daily challenge was last updated"),
});

// Schema for creating a new daily challenge (omits system-generated fields)
export const CreateDailyChallengeSchema = DailyChallengeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating an existing daily challenge (all fields optional)
export const UpdateDailyChallengeSchema = CreateDailyChallengeSchema.partial();
