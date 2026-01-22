import { z } from "zod";
import {
  CreateDomainSchema,
  DomainSchema,
  UpdateDomainSchema,
} from "./domain.schema";

// Type inference from Zod schemas
export type DomainEntity = z.infer<typeof DomainSchema>;
export type CreateDomainEntity = z.infer<typeof CreateDomainSchema>;
export type UpdateDomainEntity = z.infer<typeof UpdateDomainSchema>;
