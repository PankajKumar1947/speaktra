import { createZodDto } from 'nestjs-zod';
import { CreateSentenceSchema } from '@repo/schema';

// DTO for creating a new sentence, extends Zod schema from shared package
export class CreateSentenceDto extends createZodDto(CreateSentenceSchema) {}
