import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSentence,
  updateSentence,
  removeSentence,
  sentenceQueries,
} from "@repo/api-client";
import { CreateSentence, UpdateSentence } from "@repo/schema";

export const useCreateSentence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: sentenceQueries.create.key,
    mutationFn: (data: CreateSentence) => createSentence(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentenceQueries.findAll.key });
    },
  });
};

export const useUpdateSentence = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: sentenceQueries.update.key,
    mutationFn: (data: UpdateSentence) => updateSentence(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sentenceQueries.findAll.key,
      });
      queryClient.invalidateQueries({
        queryKey: [...sentenceQueries.findOne.key, id],
      });
    },
  });
};

export const useRemoveSentence = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: sentenceQueries.remove.key,
    mutationFn: () => removeSentence(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sentenceQueries.findAll.key });
    },
  });
};
