import { z } from "zod";

// Full domain entity schema
export const DomainSchema = z.object({
  _id: z
    .string()
    .describe("The unique identifier of the domain (MongoDB ObjectId)"),
  name: z
    .string()
    .min(2, { message: "Domain name must be at least 2 characters long" })
    .describe("The name of the domain"),
  description: z.string().optional().describe("Description of the domain"),
  createdAt: z
    .string()
    .optional()
    .describe("The date and time when the domain was created"),
  updatedAt: z
    .string()
    .optional()
    .describe("The date and time when the domain was last updated"),
});

// Schema for creating a new domain (omits system-generated fields)
export const CreateDomainSchema = DomainSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a domain (partial with no system fields)
export const UpdateDomainSchema = DomainSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
