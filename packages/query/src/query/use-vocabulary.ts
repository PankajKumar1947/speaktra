import { useQuery } from "@tanstack/react-query";
import {
  findAllVocabularies,
  findOneVocabulary,
  findVocabulariesByDomain,
  vocabularyQueries,
} from "@repo/api-client";

export const useVocabularies = () => {
  return useQuery({
    queryKey: vocabularyQueries.findAll.key,
    queryFn: () => findAllVocabularies(),
  });
};

export const useVocabulary = (id: string) => {
  return useQuery({
    queryKey: [...vocabularyQueries.findOne.key, id],
    queryFn: () => findOneVocabulary(id),
    enabled: !!id,
  });
};

export const useVocabulariesByDomain = (domainId: string) => {
  return useQuery({
    queryKey: [...vocabularyQueries.findByDomain.key, domainId],
    queryFn: () => findVocabulariesByDomain(domainId),
    enabled: !!domainId,
  });
};
