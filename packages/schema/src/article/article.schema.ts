import { z } from "zod";
import { DifficultyEnum } from "../common/common.enum";

// Full article entity schema
export const ArticleSchema = z.object({
  id: z
    .string()
    .describe("The unique identifier of the article (MongoDB ObjectId)"),
  type: z
    .string()
    .min(1, { message: "Article type cannot be empty" })
    .describe(
      "Article type (user-defined, e.g., 'business communication', 'team management')",
    ),
  title: z
    .string()
    .min(1, { message: "Title cannot be empty" })
    .describe("The article title"),
  minRead: z
    .number()
    .positive({ message: "Reading time must be a positive number" })
    .describe("Estimated reading time in minutes"),
  domainId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "domainId must be a valid MongoDB ObjectId",
    })
    .describe("Reference to the domain this article belongs to"),
  difficulty: DifficultyEnum.describe("Difficulty level of the article"),
  keywords: z
    .array(z.string().min(1, { message: "Keyword cannot be empty" }))
    .optional()
    .describe("Array of vocabulary keywords"),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty" })
    .describe("Article description or summary"),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the article was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the article was last updated"),
});

// Schema for creating a new article (omits system-generated fields)
export const CreateArticleSchema = ArticleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating an article (partial with no system fields)
export const UpdateArticleSchema = ArticleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
