import { dailyChallengeQueries } from "../../react-queries/daily-challenge";
import { DailyChallenge, Article, Sentence, Vocabulary } from "@repo/schema";
import { apiClient } from "../../services/axios";

export const getDailyChallengeForUser = async (): Promise<DailyChallenge> => {
  const response = await apiClient.get(
    dailyChallengeQueries.getForUser.endpoint,
  );
  return response.data;
};

export const getDailyChallengeVocabularies = async (
  dailyChallengeId: string,
): Promise<Vocabulary[]> => {
  const response = await apiClient.get(
    dailyChallengeQueries.getVocabularies.endpoint(dailyChallengeId),
  );
  return response.data;
};

export const getDailyChallengeSentences = async (
  dailyChallengeId: string,
): Promise<Sentence[]> => {
  const response = await apiClient.get(
    dailyChallengeQueries.getSentences.endpoint(dailyChallengeId),
  );
  return response.data;
};

export const getDailyChallengeArticles = async (
  dailyChallengeId: string,
): Promise<Article[]> => {
  const response = await apiClient.get(
    dailyChallengeQueries.getArticles.endpoint(dailyChallengeId),
  );
  return response.data;
};
