import { CreateArticle, UpdateArticle, Article } from "@repo/schema";
import { articleQueries } from "../../react-queries/article";
import { apiClient } from "../../services/axios";

export const createArticle = async (data: CreateArticle): Promise<Article> => {
  const res = await apiClient.post(articleQueries.create.endpoint, data);
  return res.data;
};

export const findAllArticles = async (): Promise<Article[]> => {
  const res = await apiClient.get(articleQueries.findAll.endpoint);
  return res.data;
};

export const findArticlesByDomain = async (
  domainId: string,
): Promise<Article[]> => {
  const res = await apiClient.get(
    articleQueries.findByDomain.endpoint(domainId),
  );
  return res.data;
};

export const findArticlesByType = async (type: string): Promise<Article[]> => {
  const res = await apiClient.get(articleQueries.findByType.endpoint(type));
  return res.data;
};

export const findOneArticle = async (id: string): Promise<Article> => {
  const res = await apiClient.get(articleQueries.findOne.endpoint(id));
  return res.data;
};

export const updateArticle = async (
  id: string,
  data: UpdateArticle,
): Promise<Article> => {
  const res = await apiClient.patch(articleQueries.update.endpoint(id), data);
  return res.data;
};

export const removeArticle = async (
  id: string,
): Promise<{ deleted: boolean }> => {
  const res = await apiClient.delete(articleQueries.remove.endpoint(id));
  return res.data;
};
