import { LoginBody, RegisterBody } from "@repo/schema";
import { authQueries } from "../../queries/auth";
import { apiClient } from "../../services/axios";

export const login = async (data: LoginBody) => {
  const res = await apiClient.post(authQueries.login.url, data);
  return res.data;
};

export const register = async (data: RegisterBody) => {
  const res = await apiClient.post(authQueries.register.url, data);
  return res.data;
};
