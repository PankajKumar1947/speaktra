import { Domain } from "./domain.schema";

export interface DomainItem {
  _id: Domain;
  id: Domain;
  name: string;
  description: string;
}

export type DomainEntity = DomainItem;
