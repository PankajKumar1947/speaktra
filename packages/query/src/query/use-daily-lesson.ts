import { useQuery } from "@tanstack/react-query";
import {
  dailyLessonQueries,
  getDailyLessonArticles,
  getDailyLessonForUser,
  getDailyLessonSentences,
  getDailyLessonVocabularies,
} from "@repo/api-client";

export const useDailyLessonForUser = () => {
  return useQuery({
    queryKey: dailyLessonQueries.getForUser.key,
    queryFn: getDailyLessonForUser,
  });
};

export const useDailyLessonVocabularies = (dailyLessonId: string) => {
  return useQuery({
    queryKey: dailyLessonQueries.getVocabularies.key,
    queryFn: () => getDailyLessonVocabularies(dailyLessonId),
  });
};

export const useDailyLessonSentences = (dailyLessonId: string) => {
  return useQuery({
    queryKey: dailyLessonQueries.getSentences.key,
    queryFn: () => getDailyLessonSentences(dailyLessonId),
  });
};

export const useDailyLessonArticles = (dailyLessonId: string) => {
  return useQuery({
    queryKey: dailyLessonQueries.getArticles.key,
    queryFn: () => getDailyLessonArticles(dailyLessonId),
  });
};
