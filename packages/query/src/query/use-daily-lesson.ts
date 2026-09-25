import { useQuery } from "@tanstack/react-query";
import {
  dailyLessonQueries,
  getDailyLessonArticles,
  getDailyLessonForUser,
  getDailyLessonSentences,
  getDailyLessonVocabularies,
} from "@repo/api-client";

export const useDailyLessonForUser = (
  date?: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: [...dailyLessonQueries.getForUser.key, date ?? "today"],
    queryFn: () => getDailyLessonForUser(date),
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      const status = (error as unknown as { response?: { status?: number } })
        ?.response?.status;
      if (status !== undefined && status >= 400 && status < 500) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useDailyLessonVocabularies = (dailyLessonId: string) => {
  return useQuery({
    queryKey: [...dailyLessonQueries.getVocabularies.key, dailyLessonId],
    queryFn: () => getDailyLessonVocabularies(dailyLessonId),
    enabled: !!dailyLessonId,
  });
};

export const useDailyLessonSentences = (dailyLessonId: string) => {
  return useQuery({
    queryKey: [...dailyLessonQueries.getSentences.key, dailyLessonId],
    queryFn: () => getDailyLessonSentences(dailyLessonId),
    enabled: !!dailyLessonId,
  });
};

export const useDailyLessonArticles = (dailyLessonId: string) => {
  return useQuery({
    queryKey: [...dailyLessonQueries.getArticles.key, dailyLessonId],
    queryFn: () => getDailyLessonArticles(dailyLessonId),
    enabled: !!dailyLessonId,
  });
};
