import { ContactMessage, CreateContactMessage } from "@repo/schema";
import { contactQueries } from "../../react-queries/contact";
import { apiClient } from "../../services/axios";

export const createContactMessage = async (
  data: CreateContactMessage,
): Promise<ContactMessage> => {
  const res = await apiClient.post(contactQueries.create.endpoint, data);
  return res.data;
};

export const findAllContactMessages = async (): Promise<ContactMessage[]> => {
  const res = await apiClient.get(contactQueries.findAll.endpoint);
  return res.data;
};
