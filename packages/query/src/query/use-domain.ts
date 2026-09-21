import { useQuery } from "@tanstack/react-query";
import { findAllDomains, domainQueries } from "@repo/api-client";

export const useDomains = () => {
  return useQuery({
    queryKey: domainQueries.findAll.key,
    queryFn: () => findAllDomains(),
  });
};
