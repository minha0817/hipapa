import { z } from "zod";

export type AddSleepForm = {
  startTime: string;
  endTime: string;
  description: string;
}

export const addSleepSchema = z.object({
  startTime: z.string(),
  endTime: z.string().optional(),
  description: z.string().optional(),
})
