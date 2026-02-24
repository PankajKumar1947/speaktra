import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDomain,
  updateDomain,
  removeDomain,
  domainQueries,
} from "@repo/api-client";
import { CreateDomainEntity, UpdateDomainEntity } from "@repo/schema";

export const useCreateDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: domainQueries.create.key,
    mutationFn: (data: CreateDomainEntity) => createDomain(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainQueries.findAll.key });
    },
  });
};

export const useUpdateDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: domainQueries.update.key,
    mutationFn: ({ id, data }: { id: string; data: UpdateDomainEntity }) =>
      updateDomain(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: domainQueries.findAll.key });
      queryClient.invalidateQueries({
        queryKey: [...domainQueries.findOne.key, variables.id],
      });
    },
  });
};

export const useRemoveDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: domainQueries.remove.key,
    mutationFn: (id: string) => removeDomain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainQueries.findAll.key });
    },
  });
};
