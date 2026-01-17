import z from "zod";
import { RegisterSchema, LoginSchema } from "./auth.schema";

export type RegisterBody = z.infer<typeof RegisterSchema>;
export type LoginBody = z.infer<typeof LoginSchema>;
