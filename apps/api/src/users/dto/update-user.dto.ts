import { createZodDto } from 'nestjs-zod';
import { UpdateUserSchema } from '@repo/schema';

// DTO for updating an existing user, extends Zod schema from shared package
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
