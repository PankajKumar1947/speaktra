import { Domain } from "./domain.schema";

export interface DomainItem {
  id: Domain;
  name: string;
  description: string;
}

export type DomainEntity = DomainItem;
