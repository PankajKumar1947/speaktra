import { z } from "zod";
import {
  CreateVocabularySchema,
  UpdateVocabularySchema,
  VocabularySchema,
} from "./vocabulary.schema";

export type Vocabulary = z.infer<typeof VocabularySchema>;
export type CreateVocabulary = z.infer<typeof CreateVocabularySchema>;
export type UpdateVocabulary = z.infer<typeof UpdateVocabularySchema>;
