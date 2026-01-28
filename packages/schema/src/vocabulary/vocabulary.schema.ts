import { z } from "zod";

// Word form schema - each word form has meaning and example
const WordFormSchema = z.object({
  meaning: z.string().describe("The meaning of the word in this form"),
  example: z
    .string()
    .optional()
    .describe("Example sentence using this word form"),
});

// Difficulty enum
export const DifficultyLevelEnum = z.enum(["easy", "medium", "hard"]);

// Full vocabulary entity schema
export const VocabularySchema = z.object({
  id: z
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
  domainId: z
    .string()
    .describe("Reference to the domain this vocabulary belongs to"),
  difficulty: DifficultyLevelEnum.describe(
    "Difficulty level of the vocabulary",
  ),
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
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a vocabulary (partial with no system fields)
export const UpdateVocabularySchema = VocabularySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
