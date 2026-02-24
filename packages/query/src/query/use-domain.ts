import { useQuery } from "@tanstack/react-query";
import { findAllDomains, findOneDomain, domainQueries } from "@repo/api-client";

export const useDomains = () => {
  return useQuery({
    queryKey: domainQueries.findAll.key,
    queryFn: () => findAllDomains(),
  });
};

export const useDomain = (id: string) => {
  return useQuery({
    queryKey: [...domainQueries.findOne.key, id],
    queryFn: () => findOneDomain(id),
    enabled: !!id,
  });
};
