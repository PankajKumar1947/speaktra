import { z } from "zod";
import {
  CreateSentenceSchema,
  SentenceSchema,
  UpdateSentenceSchema,
} from "./sentence.schema";

// Type inference from Zod schemas
export type SentenceEntity = z.infer<typeof SentenceSchema>;
export type CreateSentenceEntity = z.infer<typeof CreateSentenceSchema>;
export type UpdateSentenceEntity = z.infer<typeof UpdateSentenceSchema>;
