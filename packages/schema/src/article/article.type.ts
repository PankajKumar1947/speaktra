import { z } from "zod";
import {
  CreateArticleSchema,
  ArticleSchema,
  UpdateArticleSchema,
} from "./article.schema";

// Type inference from Zod schemas
export type ArticleEntity = z.infer<typeof ArticleSchema>;
export type CreateArticleEntity = z.infer<typeof CreateArticleSchema>;
export type UpdateArticleEntity = z.infer<typeof UpdateArticleSchema>;
