import { createZodDto } from 'nestjs-zod';
import { UpdateDailyChallengeSchema } from '@repo/schema';

// DTO for updating an existing daily challenge, extends Zod schema from shared package
export class UpdateDailyChallengeDto extends createZodDto(
  UpdateDailyChallengeSchema,
) {}
