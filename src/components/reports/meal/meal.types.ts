import { z } from "zod";

export enum MealTypeEnum {
  MORNINGSNACK = "morning_snack",
  LUNCH = "lunch",
  AFTERNOONSNACK = "afternoon_snack"
}

export enum QuantityEnum {
  ALL = "all",
  MOST = "most",
  SOME = "some",
  NONE = "none"
}

export type AddMealForm = {
  time: string;
  mealType: MealTypeEnum;
  quantity: QuantityEnum;
  description: string;
};

export const addMealSchema = z.object({
  time: z.string().optional(),
  mealType: z.string(),
  quantity: z.string(),
  description: z.string().optional(),
});
