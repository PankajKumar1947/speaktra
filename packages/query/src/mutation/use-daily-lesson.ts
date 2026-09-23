import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDailyLesson,
  dailyLessonQueries,
  triggerDailyLessonGeneration,
} from "@repo/api-client";
import { CreateDailyLesson, Domain, Level } from "@repo/schema";

export const useCreateDailyLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDailyLesson) => createDailyLesson(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: dailyLessonQueries.getForUser.key,
      });
    },
  });
};

export const useTriggerDailyLessonGeneration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data?: {
      domain?: Domain;
      level?: Level;
      sequenceNumber?: number;
    }) => triggerDailyLessonGeneration(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: dailyLessonQueries.getForUser.key,
      });
    },
  });
};
