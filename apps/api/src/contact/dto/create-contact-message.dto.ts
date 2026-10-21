import { createZodDto } from 'nestjs-zod';
import { CreateContactMessageSchema } from '@repo/schema';

// DTO for submitting a contact message, extends Zod schema from shared package
export class CreateContactMessageDto extends createZodDto(
  CreateContactMessageSchema,
) {}
