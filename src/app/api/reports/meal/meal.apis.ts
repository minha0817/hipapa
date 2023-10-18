import "server-only";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { formatTime } from "../report.utils";
import { AddMealForm } from "@/components/reportForm/mealForm/meal.types";

export const createMealReport = async (
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddMealForm
) => {
  //Need this to format values.time which is string into timestamptz
  const formattedDate = formatTime(values.time);

  const mealData = childrenIds.map((childId) => {
    return {
      time: formattedDate!,
      child_id: childId,
      meal_type: values.mealType,
      quantity: values.quantity,
      description: values.description,
    };
  });

  const { error } = await supabase
    .from("meal_reports")
    .insert(mealData)

  if(error) throw error;
  
};
