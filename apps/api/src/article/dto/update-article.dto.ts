import { createZodDto } from 'nestjs-zod';
import { UpdateArticleSchema } from '@repo/schema';

// DTO for updating an existing article, extends Zod schema from shared package
export class UpdateArticleDto extends createZodDto(UpdateArticleSchema) {}
