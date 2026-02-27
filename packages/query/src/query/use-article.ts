import { useQuery } from "@tanstack/react-query";
import {
  findAllArticles,
  findOneArticle,
  findArticlesByDomain,
  findArticlesByType,
  articleQueries,
} from "@repo/api-client";

export const useArticles = () => {
  return useQuery({
    queryKey: articleQueries.findAll.key,
    queryFn: () => findAllArticles(),
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: [...articleQueries.findOne.key, id],
    queryFn: () => findOneArticle(id),
    enabled: !!id,
  });
};

export const useArticlesByDomain = (domainId: string) => {
  return useQuery({
    queryKey: [...articleQueries.findByDomain.key, domainId],
    queryFn: () => findArticlesByDomain(domainId),
    enabled: !!domainId,
  });
};

export const useArticlesByType = (type: string) => {
  return useQuery({
    queryKey: [...articleQueries.findByType.key, type],
    queryFn: () => findArticlesByType(type),
    enabled: !!type,
  });
};
