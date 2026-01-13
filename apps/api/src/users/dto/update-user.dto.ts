import { createZodDto } from 'nestjs-zod';
import { UpdateUserSchema } from '@repo/schema';

/**
 * UpdateUserDto
 * Adapter class to use logic from @repo/schema in NestJS.
 */
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
