import { z } from "zod";
import {
  CreateVocabularySchema,
  UpdateVocabularySchema,
  VocabularySchema,
} from "./vocabulary.schema";

// Type inference from Zod schemas
export type VocabularyEntity = z.infer<typeof VocabularySchema>;
export type CreateVocabularyEntity = z.infer<typeof CreateVocabularySchema>;
export type UpdateVocabularyEntity = z.infer<typeof UpdateVocabularySchema>;
