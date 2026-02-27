import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVocabulary,
  updateVocabulary,
  removeVocabulary,
  vocabularyQueries,
} from "@repo/api-client";
import { CreateVocabulary, UpdateVocabulary } from "@repo/schema";

export const useCreateVocabulary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: vocabularyQueries.create.key,
    mutationFn: (data: CreateVocabulary) => createVocabulary(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: vocabularyQueries.findAll.key,
      });
    },
  });
};

export const useUpdateVocabulary = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: vocabularyQueries.update.key,
    mutationFn: (data: UpdateVocabulary) => updateVocabulary(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: vocabularyQueries.findAll.key,
      });
      queryClient.invalidateQueries({
        queryKey: [...vocabularyQueries.findOne.key, id],
      });
    },
  });
};

export const useRemoveVocabulary = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: vocabularyQueries.remove.key,
    mutationFn: () => removeVocabulary(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: vocabularyQueries.findAll.key,
      });
    },
  });
};
