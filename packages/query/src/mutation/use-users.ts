import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  updateUser,
  removeUser,
  completeOnboarding,
  userQueries,
} from "@repo/api-client";
import { CreateUser, UpdateUser, CompleteOnboarding } from "@repo/schema";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userQueries.create.key,
    mutationFn: (data: CreateUser) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.findAll.key,
      });
    },
  });
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userQueries.update.key,
    mutationFn: (data: UpdateUser) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userQueries.findOne.key, id],
      });
    },
  });
};

export const useRemoveUser = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userQueries.remove.key,
    mutationFn: () => removeUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.findAll.key,
      });
    },
  });
};

export const useCompleteOnboarding = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: userQueries.completeOnboarding.key,
    mutationFn: (data: CompleteOnboarding) => completeOnboarding(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [userQueries.findOne.key, data.id],
      });
    },
  });
};
