import { z } from "zod";

export type AddIncidentForm = {
  time: string;
  description: string;
}

export const addIncidentSchema = z.object({
  time:  z.string(),
  description: z.string(),
});