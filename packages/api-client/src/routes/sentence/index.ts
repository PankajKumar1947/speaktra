import { CreateSentence, UpdateSentence, Sentence } from "@repo/schema";
import { sentenceQueries } from "../../react-queries/sentence";
import { apiClient } from "../../services/axios";

export const createSentence = async (
  data: CreateSentence,
): Promise<Sentence> => {
  const res = await apiClient.post(sentenceQueries.create.endpoint, data);
  return res.data;
};

export const findAllSentences = async (): Promise<Sentence[]> => {
  const res = await apiClient.get(sentenceQueries.findAll.endpoint);
  return res.data;
};

export const findSentencesByDomain = async (
  domainId: string,
): Promise<Sentence[]> => {
  const res = await apiClient.get(
    sentenceQueries.findByDomain.endpoint(domainId),
  );
  return res.data;
};

export const findOneSentence = async (id: string): Promise<Sentence> => {
  const res = await apiClient.get(sentenceQueries.findOne.endpoint(id));
  return res.data;
};

export const updateSentence = async (
  id: string,
  data: UpdateSentence,
): Promise<Sentence> => {
  const res = await apiClient.patch(sentenceQueries.update.endpoint(id), data);
  return res.data;
};

export const removeSentence = async (
  id: string,
): Promise<{ deleted: boolean }> => {
  const res = await apiClient.delete(sentenceQueries.remove.endpoint(id));
  return res.data;
};
