import { z } from "zod";

export type AddAdminMessagsModalForm = {
  childrenIds: string[];
  title: string;
  body: string;
  attachments?: string;
}

export const addAdminMessagsModalSchema = z.object({
  // childrenIds: string[];
  title: z.string(),
  body: z.string(),
  attachments: z.string().optional()
});