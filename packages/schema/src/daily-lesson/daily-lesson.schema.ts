import { z } from "zod";
import { LevelEnum } from "../common/common.enum";
import { DomainEnum } from "../domain/domain.schema";

export const DailyLessonSchema = z.object({
  id: z.string().describe("The unique identifier of the daily lesson"),
  sequenceNumber: z
    .number()
    .positive()
    .describe("The sequence number of the daily lesson"),
  domain: DomainEnum.describe("The domain this daily lesson belongs to"),
  level: LevelEnum.describe("Proficiency level of the daily lesson"),
  theme: z.string().optional().describe("Theme of the daily lesson"),
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
    .describe("The date and time when the daily lesson was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the daily lesson was last updated"),
});

export const CreateDailyLessonSchema = DailyLessonSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateDailyLessonSchema = CreateDailyLessonSchema.partial();

// Backward compatibility alias during migration
export const DailyChallengeSchema = DailyLessonSchema;
export const CreateDailyChallengeSchema = CreateDailyLessonSchema;
export const UpdateDailyChallengeSchema = UpdateDailyLessonSchema;
