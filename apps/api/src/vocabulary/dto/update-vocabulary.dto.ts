import { createZodDto } from 'nestjs-zod';
import { UpdateVocabularySchema } from '@repo/schema';

// DTO for updating an existing vocabulary, extends Zod schema from shared package
export class UpdateVocabularyDto extends createZodDto(UpdateVocabularySchema) {}
