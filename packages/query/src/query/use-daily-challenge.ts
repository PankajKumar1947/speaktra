import { useQuery } from "@tanstack/react-query";
import {
  dailyChallengeQueries,
  getDailyChallengeArticles,
  getDailyChallengeForUser,
  getDailyChallengeSentences,
  getDailyChallengeVocabularies,
} from "@repo/api-client";

export const useDailyChallengeForUser = () => {
  return useQuery({
    queryKey: dailyChallengeQueries.getForUser.key,
    queryFn: getDailyChallengeForUser,
  });
};

export const useVocabularies = (dailyChallengeId: string) => {
  return useQuery({
    queryKey: dailyChallengeQueries.getVocabularies.key,
    queryFn: () => getDailyChallengeVocabularies(dailyChallengeId),
  });
};

export const useSentences = (dailyChallengeId: string) => {
  return useQuery({
    queryKey: dailyChallengeQueries.getSentences.key,
    queryFn: () => getDailyChallengeSentences(dailyChallengeId),
  });
};

export const useArticles = (dailyChallengeId: string) => {
  return useQuery({
    queryKey: dailyChallengeQueries.getArticles.key,
    queryFn: () => getDailyChallengeArticles(dailyChallengeId),
  });
};
