import { useMutation } from "@tanstack/react-query";
import { contactQueries, createContactMessage } from "@repo/api-client";
import { CreateContactMessage } from "@repo/schema";

export const useCreateContactMessage = () => {
  return useMutation({
    mutationKey: contactQueries.create.key,
    mutationFn: (data: CreateContactMessage) => createContactMessage(data),
  });
};
