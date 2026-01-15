import { z } from "zod";
import { PracticeDifficultyEnum } from "./practice.enum";

/**
 * Vocabulary Word Schema
 */
export const VocabularyWordSchema = z.object({
  id: z.string(),
  word: z.string(),
  definition: z.string(),
  example: z.string(),
  domain: z.string(),
  difficulty: PracticeDifficultyEnum,
  learned: z.boolean().default(false),
});

/**
 * Sentence Practice Schema
 */
export const SentencePracticeSchema = z.object({
  id: z.string(),
  sentence: z.string(),
  translation: z.string().optional(),
  context: z.string(),
  domain: z.string(),
  difficulty: PracticeDifficultyEnum,
  completed: z.boolean().default(false),
});

/**
 * Reading Article Schema
 */
export const ReadingArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  content: z.string(),
  keyVocabulary: z.array(z.string()),
  difficulty: PracticeDifficultyEnum,
  estimatedMinutes: z.number(),
  completed: z.boolean().default(false),
});
