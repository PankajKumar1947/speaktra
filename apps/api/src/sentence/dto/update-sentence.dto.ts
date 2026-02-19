import { createZodDto } from 'nestjs-zod';
import { UpdateSentenceSchema } from '@repo/schema';

// DTO for updating an existing sentence, extends Zod schema from shared package
export class UpdateSentenceDto extends createZodDto(UpdateSentenceSchema) {}
