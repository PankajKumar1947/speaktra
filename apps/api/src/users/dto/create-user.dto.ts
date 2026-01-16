import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from '@repo/schema';

// DTO for creating a new user, extends Zod schema from shared package
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
