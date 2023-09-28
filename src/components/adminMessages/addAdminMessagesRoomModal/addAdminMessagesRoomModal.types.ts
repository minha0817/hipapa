import { z } from "zod";

export type AddAdminMessagsRoomModalForm = {
  childrenIds: string[];
  title: string;
  body: string;
  attachments?: string;
}

export const addAdminMessagsRoomModalSchema = z.object({
  title: z.string(),
  body: z.string(),
  attachments: z.string().optional()
});