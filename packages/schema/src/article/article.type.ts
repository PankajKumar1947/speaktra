import { z } from "zod";
import {
  CreateArticleSchema,
  ArticleSchema,
  UpdateArticleSchema,
} from "./article.schema";

export type Article = z.infer<typeof ArticleSchema>;
export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type UpdateArticle = z.infer<typeof UpdateArticleSchema>;
