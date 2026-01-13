import { createZodDto } from 'nestjs-zod';
import { CreateUserSchema } from '@repo/schema';
import { ApiProperty } from '@nestjs/swagger';

/**
 * CreateUserDto
 * Adapter class to use logic from @repo/schema in NestJS.
 * This enables Swagger documentation and automatic validation.
 */
export class CreateUserDto extends createZodDto(CreateUserSchema) {
  // Override specific fields to provide better Swagger examples
  @ApiProperty({ example: 'John Doe', description: 'The full name of the user' })
  name!: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  age!: number;
}
