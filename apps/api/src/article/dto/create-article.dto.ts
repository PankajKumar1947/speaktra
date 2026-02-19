import { createZodDto } from 'nestjs-zod';
import { CreateArticleSchema } from '@repo/schema';

// DTO for creating a new article, extends Zod schema from shared package
export class CreateArticleDto extends createZodDto(CreateArticleSchema) {}
