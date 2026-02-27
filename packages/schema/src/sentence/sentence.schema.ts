import { z } from "zod";
import { DifficultyEnum } from "../common/common.enum";

// Sentence schema - array of different ways to express the same sentence (max 3)

// Full sentence entity schema
export const SentenceSchema = z.object({
  _id: z
    .string()
    .describe("The unique identifier of the sentence (MongoDB ObjectId)"),
  sentence: z
    .string()
    .min(1, { message: "Sentence cannot be empty" })
    .describe("The main sentence"),
  otherWays: z
    .array(
      z.string().min(1, { message: "Alternative sentence cannot be empty" }),
    )
    .max(2, { message: "Maximum 2 alternative ways allowed" })
    .optional()
    .describe("Other ways to express the same sentence (max 2)"),
  context: z
    .string()
    .min(1, { message: "Context cannot be empty" })
    .describe("Context where the sentence is used"),
  explanation: z
    .string()
    .min(1, { message: "Explanation cannot be empty" })
    .describe("Explanation of the sentence meaning and usage"),
  domainId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "domainId must be a valid MongoDB ObjectId",
    })
    .describe("Reference to the domain this sentence belongs to"),
  difficulty: DifficultyEnum.describe("Difficulty level of the sentence"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the sentence was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the sentence was last updated"),
});

// Schema for creating a new sentence (omits system-generated fields)
export const CreateSentenceSchema = SentenceSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a sentence (partial with no system fields)
export const UpdateSentenceSchema = SentenceSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
