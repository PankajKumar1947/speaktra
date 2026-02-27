import { z } from "zod";
import { DifficultyEnum } from "../common/common.enum";

// Word form schema - each word form has meaning and example
const WordFormSchema = z.object({
  meaning: z.string().describe("The meaning of the word in this form"),
  example: z
    .string()
    .optional()
    .describe("Example sentence using this word form"),
});

// Full vocabulary entity schema
export const VocabularySchema = z.object({
  _id: z
    .string()
    .describe("The unique identifier of the vocabulary (MongoDB ObjectId)"),
  word: z
    .string()
    .min(1, { message: "Word must not be empty" })
    .describe("The vocabulary word"),
  noun: WordFormSchema.optional().describe("Noun form of the word"),
  verb: WordFormSchema.optional().describe("Verb form of the word"),
  adjective: WordFormSchema.optional().describe("Adjective form of the word"),
  adverb: WordFormSchema.optional().describe("Adverb form of the word"),
  domain_Id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "domainId must be a valid MongoDB ObjectId",
    })
    .describe("Reference to the domain this vocabulary belongs to"),
  difficulty: DifficultyEnum.describe("Difficulty level of the vocabulary"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the vocabulary was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the vocabulary was last updated"),
});

// Schema for creating a new vocabulary (omits system-generated fields)
export const CreateVocabularySchema = VocabularySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a vocabulary (partial with no system fields)
export const UpdateVocabularySchema = VocabularySchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
