import { z } from "zod";
import {
  ContactMessageSchema,
  CreateContactMessageSchema,
  UpdateContactMessageSchema,
} from "./contact.schema";

export type ContactMessage = z.infer<typeof ContactMessageSchema>;
export type CreateContactMessage = z.infer<typeof CreateContactMessageSchema>;
export type UpdateContactMessage = z.infer<typeof UpdateContactMessageSchema>;
