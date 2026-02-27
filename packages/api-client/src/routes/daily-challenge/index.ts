import { dailyChallengeQueries } from "../../react-queries/daily-challenge";
import { DailyChallenge } from "@repo/schema";
import { apiClient } from "../../services/axios";

export const getDailyChallengeForUser = async (): Promise<DailyChallenge> => {
  const response = await apiClient.get(
    dailyChallengeQueries.getForUser.endpoint,
  );
  return response.data;
};
