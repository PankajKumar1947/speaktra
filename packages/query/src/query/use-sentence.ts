import { useQuery } from "@tanstack/react-query";
import {
  findAllSentences,
  findOneSentence,
  findSentencesByDomain,
  sentenceQueries,
} from "@repo/api-client";

export const useSentences = () => {
  return useQuery({
    queryKey: sentenceQueries.findAll.key,
    queryFn: () => findAllSentences(),
  });
};

export const useSentence = (id: string) => {
  return useQuery({
    queryKey: [...sentenceQueries.findOne.key, id],
    queryFn: () => findOneSentence(id),
    enabled: !!id,
  });
};

export const useSentencesByDomain = (domainId: string) => {
  return useQuery({
    queryKey: [...sentenceQueries.findByDomain.key, domainId],
    queryFn: () => findSentencesByDomain(domainId),
    enabled: !!domainId,
  });
};
