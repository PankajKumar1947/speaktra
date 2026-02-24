import {
  CreateDomainEntity,
  UpdateDomainEntity,
  DomainEntity,
  ApiResponse,
} from "@repo/schema";
import { domainQueries } from "../../react-queries/domain";
import { apiClient } from "../../services/axios";

export const createDomain = async (
  data: CreateDomainEntity,
): Promise<ApiResponse<DomainEntity>> => {
  const res = await apiClient.post(domainQueries.create.endpoint, data);
  return res.data;
};

export const findAllDomains = async (): Promise<
  ApiResponse<DomainEntity[]>
> => {
  const res = await apiClient.get(domainQueries.findAll.endpoint);
  return res.data;
};

export const findOneDomain = async (
  id: string,
): Promise<ApiResponse<DomainEntity>> => {
  const res = await apiClient.get(domainQueries.findOne.endpoint(id));
  return res.data;
};

export const updateDomain = async (
  id: string,
  data: UpdateDomainEntity,
): Promise<ApiResponse<DomainEntity>> => {
  const res = await apiClient.patch(domainQueries.update.endpoint(id), data);
  return res.data;
};

export const removeDomain = async (
  id: string,
): Promise<ApiResponse<{ deleted: boolean }>> => {
  const res = await apiClient.delete(domainQueries.remove.endpoint(id));
  return res.data;
};
