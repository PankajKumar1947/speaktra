import { z } from 'zod';
import {
  CreateVocabularySchema,
  CreateSentenceSchema,
  CreateArticleSchema,
} from '@repo/schema';

// Response schemas matching AI JSON output
export const AIGenerateVocabResponseSchema = z.object({
  vocabularies: z.array(CreateVocabularySchema.omit({ domain: true })),
});

export const AIGenerateSentenceResponseSchema = z.object({
  sentences: z.array(CreateSentenceSchema.omit({ domain: true })),
});

export const AIGenerateArticleResponseSchema = z.object({
  articles: z.array(CreateArticleSchema.omit({ domain: true })),
});

// JSON Schema representations passed to LLM responseFormat
export const AIVocabJsonSchema = z.toJSONSchema(
  AIGenerateVocabResponseSchema,
) as Record<string, unknown>;

export const AISentenceJsonSchema = z.toJSONSchema(
  AIGenerateSentenceResponseSchema,
) as Record<string, unknown>;

export const AIArticleJsonSchema = z.toJSONSchema(
  AIGenerateArticleResponseSchema,
) as Record<string, unknown>;
