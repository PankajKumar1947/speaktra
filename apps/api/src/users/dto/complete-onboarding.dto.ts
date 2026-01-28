import { createZodDto } from 'nestjs-zod';
import { CompleteOnboardingSchema } from '@repo/schema';

// DTO for completing user onboarding, extends Zod schema from shared package
export class CompleteOnboardingDto extends createZodDto(
  CompleteOnboardingSchema,
) {}
