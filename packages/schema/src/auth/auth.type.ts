import z from "zod";
import { RegisterSchema, LoginSchema } from "./auth.schema";
import { User } from "../users/user.type";
import { ApiResponse } from "../common/api.type";

export type RegisterBody = z.infer<typeof RegisterSchema>;
export type LoginBody = z.infer<typeof LoginSchema>;

export type AuthData = {
  user: User;
  token: string;
};

export type AuthResponse = ApiResponse<AuthData>;
