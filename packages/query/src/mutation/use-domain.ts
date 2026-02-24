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

export const useUpdateDomain = (_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: domainQueries.update.key,
    mutationFn: (data: UpdateDomainEntity) => updateDomain(_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainQueries.findAll.key });
      queryClient.invalidateQueries({
        queryKey: domainQueries.findOne.key,
      });
    },
  });
};

export const useRemoveDomain = (_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: domainQueries.remove.key,
    mutationFn: () => removeDomain(_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: domainQueries.findAll.key });
    },
  });
};
