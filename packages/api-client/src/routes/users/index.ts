import { CreateUser, UpdateUser, User, CompleteOnboarding } from "@repo/schema";
import { userQueries } from "../../react-queries/users";
import { apiClient } from "../../services/axios";

export const createUser = async (data: CreateUser): Promise<User> => {
  const res = await apiClient.post(userQueries.create.endpoint, data);
  return res.data;
};

export const findAllUsers = async (): Promise<User[]> => {
  const res = await apiClient.get(userQueries.findAll.endpoint);
  return res.data;
};

export const findOneUser = async (id: string): Promise<User> => {
  const res = await apiClient.get(userQueries.findOne.endpoint(id));
  return res.data;
};

export const updateUser = async (
  id: string,
  data: UpdateUser,
): Promise<User> => {
  const res = await apiClient.patch(userQueries.update.endpoint(id), data);
  return res.data;
};

export const removeUser = async (id: string): Promise<{ deleted: boolean }> => {
  const res = await apiClient.delete(userQueries.remove.endpoint(id));
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await apiClient.get(userQueries.me.endpoint);
  return res.data;
};

export const updateMe = async (data: UpdateUser): Promise<User> => {
  const res = await apiClient.patch(userQueries.updateMe.endpoint, data);
  return res.data;
};

export const completeOnboarding = async (
  data: CompleteOnboarding,
): Promise<User> => {
  const res = await apiClient.patch(
    userQueries.completeOnboarding.endpoint,
    data,
  );
  return res.data;
};
