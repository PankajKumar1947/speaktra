import { createZodDto } from 'nestjs-zod';
import { CreateVocabularySchema } from '@repo/schema';

// DTO for creating a new vocabulary, extends Zod schema from shared package
export class CreateVocabularyDto extends createZodDto(CreateVocabularySchema) {}
