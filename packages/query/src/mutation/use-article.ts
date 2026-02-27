import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createArticle,
  updateArticle,
  removeArticle,
  articleQueries,
} from "@repo/api-client";
import { CreateArticle, UpdateArticle } from "@repo/schema";

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: articleQueries.create.key,
    mutationFn: (data: CreateArticle) => createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleQueries.findAll.key });
    },
  });
};

export const useUpdateArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: articleQueries.update.key,
    mutationFn: (data: UpdateArticle) => updateArticle(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleQueries.findAll.key });
      queryClient.invalidateQueries({
        queryKey: [...articleQueries.findOne.key, id],
      });
    },
  });
};

export const useRemoveArticle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: articleQueries.remove.key,
    mutationFn: () => removeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleQueries.findAll.key });
    },
  });
};
