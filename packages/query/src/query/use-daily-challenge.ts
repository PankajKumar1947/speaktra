import { useQuery } from "@tanstack/react-query";
import {
  dailyChallengeQueries,
  getDailyChallengeForUser,
} from "@repo/api-client";

export const useDailyChallengeForUser = () => {
  return useQuery({
    queryKey: dailyChallengeQueries.getForUser.key,
    queryFn: getDailyChallengeForUser,
  });
};
