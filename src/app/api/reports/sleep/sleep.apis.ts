import { AddMealForm } from "@/components/report/meal/meal.types";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { formatTime } from "../report.utils";
import { AddSleepForm } from "@/components/report/sleep/sleep.types";

export const createSleepReport = async(
  supabase: SupabaseClient<Database>,
  childrenIds: string[],
  values: AddSleepForm
) => {
  const startTime = formatTime(values.startTime);
  const endTime = formatTime(values.endTime);

  const sleepData = childrenIds.map((childId) => {
    return {
      child_id: childId,
      nap_start_time: startTime!,
      nap_end_time: endTime!,
      description: values.description
    }
  })

  const { error } = await supabase
  .from('sleep_reports')
  .insert(sleepData)

  if(error) throw error;
};
