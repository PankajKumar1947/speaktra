import { LoginBody, RegisterBody, AuthResponse } from "@repo/schema";
import { authQueries } from "../../react-queries/auth";
import { apiClient } from "../../services/axios";

export const login = async (data: LoginBody): Promise<AuthResponse> => {
  const res = await apiClient.post(authQueries.login.endpoint, data);
  return res.data;
};

export const register = async (data: RegisterBody): Promise<AuthResponse> => {
  const res = await apiClient.post(authQueries.register.endpoint, data);
  return res.data;
};
