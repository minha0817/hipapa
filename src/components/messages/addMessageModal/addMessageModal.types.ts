import { z } from "zod";

export type AddMessageModalForm = {
  message: string;
  attachments?: string;
};

export const addMessageModalSchema = z.object({
  message: z.string(),
});

