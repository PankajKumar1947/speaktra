import { dailyLessonQueries } from "../../react-queries/daily-lesson";
import {
  DailyLesson,
  CreateDailyLesson,
  Article,
  Sentence,
  Vocabulary,
  Domain,
  Level,
} from "@repo/schema";
import { apiClient } from "../../services/axios";

export const getDailyLessonForUser = async (): Promise<DailyLesson> => {
  const response = await apiClient.get(dailyLessonQueries.getForUser.endpoint);
  return response.data;
};

export const getDailyLessonVocabularies = async (
  dailyLessonId: string,
): Promise<Vocabulary[]> => {
  const response = await apiClient.get(
    dailyLessonQueries.getVocabularies.endpoint(dailyLessonId),
  );
  return response.data;
};

export const getDailyLessonSentences = async (
  dailyLessonId: string,
): Promise<Sentence[]> => {
  const response = await apiClient.get(
    dailyLessonQueries.getSentences.endpoint(dailyLessonId),
  );
  return response.data;
};

export const getDailyLessonArticles = async (
  dailyLessonId: string,
): Promise<Article[]> => {
  const response = await apiClient.get(
    dailyLessonQueries.getArticles.endpoint(dailyLessonId),
  );
  return response.data;
};

export const createDailyLesson = async (
  data: CreateDailyLesson,
): Promise<DailyLesson> => {
  const response = await apiClient.post("/daily-lesson", data);
  return response.data;
};

export const triggerDailyLessonGeneration = async (data?: {
  domain?: Domain;
  level?: Level;
  sequenceNumber?: number;
}) => {
  const response = await apiClient.post("/daily-lesson/generate", data);
  return response.data;
};
