import { z } from "zod";

export type AddSleepForm = {
  startTime: string;
  endTime: string;
  description: string;
}

export const addSleepSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
})
