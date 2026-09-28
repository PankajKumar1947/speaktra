import { z } from "zod";

export enum Domain {
  TECHNOLOGY = "technology",
  BUSINESS = "business",
  ACADEMICS = "academics",
  MEDICAL = "medical",
  FINANCE = "finance",
  LAW = "law",
  SCIENCE = "science",
}

export const DomainEnum = z.nativeEnum(Domain);

export const DomainSchema = z.object({
  id: DomainEnum,
  name: z.string().describe("The name of the domain"),
  description: z.string().describe("Description of the domain"),
});
