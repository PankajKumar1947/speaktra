import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from '@repo/schema';

/**
 * CreateUserDto
 * Adapter class to use logic from @repo/schema in NestJS.
 * This enables Swagger documentation and automatic validation.
 */
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
