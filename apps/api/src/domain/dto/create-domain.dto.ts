import { createZodDto } from 'nestjs-zod';
import { CreateDomainSchema } from '@repo/schema';

// DTO for creating a new domain, extends Zod schema from shared package
export class CreateDomainDto extends createZodDto(CreateDomainSchema) {}
