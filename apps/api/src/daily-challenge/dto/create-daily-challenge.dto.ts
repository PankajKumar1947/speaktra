import { createZodDto } from 'nestjs-zod';
import { CreateDailyChallengeSchema } from '@repo/schema';

// DTO for creating a new daily challenge, extends Zod schema from shared package
export class CreateDailyChallengeDto extends createZodDto(
  CreateDailyChallengeSchema,
) {}
