import { createZodDto } from 'nestjs-zod';
import { UpdateContactMessageSchema } from '@repo/schema';

// DTO for updating a contact message status
export class UpdateContactMessageDto extends createZodDto(
  UpdateContactMessageSchema,
) {}
