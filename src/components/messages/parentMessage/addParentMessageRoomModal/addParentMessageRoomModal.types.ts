import { z } from "zod";

export type AddParentMessagsRoomModalForm = {
  title: string;
  body: string;
  attachments?: string;
}

export const addParentMessagsRoomModalSchema = z.object({
  title: z.string(),
  body: z.string(),
  attachments: z.string().optional()
});