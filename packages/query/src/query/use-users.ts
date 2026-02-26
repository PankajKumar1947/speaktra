import { useQuery } from "@tanstack/react-query";
import { findAllUsers, findOneUser, userQueries } from "@repo/api-client";

export const useUsers = () => {
  return useQuery({
    queryKey: userQueries.findAll.key,
    queryFn: () => findAllUsers(),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: [...userQueries.findOne.key, id],
    queryFn: () => findOneUser(id),
    enabled: !!id,
  });
};
