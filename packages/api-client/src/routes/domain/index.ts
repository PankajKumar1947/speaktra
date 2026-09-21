import { DomainEntity } from "@repo/schema";
import { domainQueries } from "../../react-queries/domain";
import { apiClient } from "../../services/axios";

export const findAllDomains = async (): Promise<DomainEntity[]> => {
  const res = await apiClient.get(domainQueries.findAll.endpoint);
  return res.data;
};
