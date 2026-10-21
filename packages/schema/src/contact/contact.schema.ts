import { z } from "zod";

// Reason a visitor is reaching out
export enum ContactTopic {
  GENERAL = "general",
  SUPPORT = "support",
  FEEDBACK = "feedback",
  PARTNERSHIP = "partnership",
  BUG = "bug",
}

// Internal lifecycle of a contact message
export enum ContactMessageStatus {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
}

export const ContactTopicEnum = z.nativeEnum(ContactTopic);
export const ContactMessageStatusEnum = z.nativeEnum(ContactMessageStatus);

// Full contact message entity schema
export const ContactMessageSchema = z.object({
  _id: z
    .string()
    .describe(
      "The unique identifier of the contact message (MongoDB ObjectId)",
    ),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(80, { message: "Name must be at most 80 characters long" })
    .describe("Name of the person reaching out"),
  email: z.email({ message: "Please enter a valid email address" }),
  topic: ContactTopicEnum.describe("Topic of the message"),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" })
    .max(120, { message: "Subject must be at most 120 characters long" })
    .describe("Short summary of the message"),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(2000, { message: "Message must be at most 2000 characters long" })
    .describe("Full message from the visitor"),
  status: ContactMessageStatusEnum.optional().describe(
    "Where the message is in the support workflow",
  ),
  createdAt: z
    .date()
    .optional()
    .describe("The date and time when the message was created"),
  updatedAt: z
    .date()
    .optional()
    .describe("The date and time when the message was last updated"),
});

// Schema for creating a new contact message (omits system-generated fields)
export const CreateContactMessageSchema = ContactMessageSchema.omit({
  _id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating a contact message (partial with no system fields)
export const UpdateContactMessageSchema = ContactMessageSchema.omit({
  _id: true,
  createdAt: true,
  updatedAt: true,
}).partial();
