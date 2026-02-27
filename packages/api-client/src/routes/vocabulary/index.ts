import { CreateVocabulary, UpdateVocabulary, Vocabulary } from "@repo/schema";
import { vocabularyQueries } from "../../react-queries/vocabulary";
import { apiClient } from "../../services/axios";

export const createVocabulary = async (
  data: CreateVocabulary,
): Promise<Vocabulary> => {
  const res = await apiClient.post(vocabularyQueries.create.endpoint, data);
  return res.data;
};

export const findAllVocabularies = async (): Promise<Vocabulary[]> => {
  const res = await apiClient.get(vocabularyQueries.findAll.endpoint);
  return res.data;
};

export const findVocabulariesByDomain = async (
  domainId: string,
): Promise<Vocabulary[]> => {
  const res = await apiClient.get(
    vocabularyQueries.findByDomain.endpoint(domainId),
  );
  return res.data;
};

export const findOneVocabulary = async (id: string): Promise<Vocabulary> => {
  const res = await apiClient.get(vocabularyQueries.findOne.endpoint(id));
  return res.data;
};

export const updateVocabulary = async (
  id: string,
  data: UpdateVocabulary,
): Promise<Vocabulary> => {
  const res = await apiClient.patch(
    vocabularyQueries.update.endpoint(id),
    data,
  );
  return res.data;
};

export const removeVocabulary = async (
  id: string,
): Promise<{ deleted: boolean }> => {
  const res = await apiClient.delete(vocabularyQueries.remove.endpoint(id));
  return res.data;
};
