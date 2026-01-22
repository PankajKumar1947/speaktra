import { createZodDto } from 'nestjs-zod';
import { UpdateDomainSchema } from '@repo/schema';

// DTO for updating an existing domain, extends Zod schema from shared package
export class UpdateDomainDto extends createZodDto(UpdateDomainSchema) {}
