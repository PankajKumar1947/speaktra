import { z } from "zod";
import {
  CreateSentenceSchema,
  SentenceSchema,
  UpdateSentenceSchema,
} from "./sentence.schema";

export type Sentence = z.infer<typeof SentenceSchema>;
export type CreateSentence = z.infer<typeof CreateSentenceSchema>;
export type UpdateSentence = z.infer<typeof UpdateSentenceSchema>;
