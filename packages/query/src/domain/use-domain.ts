import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDomain,
  findAllDomains,
  findOneDomain,
  updateDomain,
  removeDomain,
  domainQueries,
} from "@repo/api-client";
import { CreateDomainEntity, UpdateDomainEntity } from "@repo/schema";

export const useDomains = () => {
  return useQuery({
    queryKey: [domainQueries.findAll.key],
    queryFn: findAllDomains,
  });
};

export const useDomain = (id: string) => {
  return useQuery({
    queryKey: [domainQueries.findOne.key, id],
    queryFn: () => findOneDomain(id),
    enabled: !!id,
  });
};

export const useDomainMutation = () => {
  const queryClient = useQueryClient();

  const createDomainMutation = useMutation({
    mutationKey: [domainQueries.create.key],
    mutationFn: (data: CreateDomainEntity) => createDomain(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [domainQueries.findAll.key] });
    },
  });

  const updateDomainMutation = useMutation({
    mutationKey: [domainQueries.update.key],
    mutationFn: ({ id, data }: { id: string; data: UpdateDomainEntity }) =>
      updateDomain(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [domainQueries.findAll.key] });
      queryClient.invalidateQueries({
        queryKey: [domainQueries.findOne.key, variables.id],
      });
    },
  });

  const removeDomainMutation = useMutation({
    mutationKey: [domainQueries.remove.key],
    mutationFn: (id: string) => removeDomain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [domainQueries.findAll.key] });
    },
  });

  return {
    createDomainMutation,
    updateDomainMutation,
    removeDomainMutation,
  };
};
