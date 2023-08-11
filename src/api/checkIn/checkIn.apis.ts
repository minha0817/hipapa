import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

export const createCheckInTeacher = async (
  supabase: SupabaseClient,
  daycareId: string,
  teacherId: string,
  isCheckedIn: boolean
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Invalid User");

  const { data, error } = await supabase
    .from("check_in")
    .insert({ teacher_id: teacherId, daycare_id: daycareId, is_checked_in: isCheckedIn });
  if (error) throw error;
};

export const getCheckIn = async (supabase: SupabaseClient) => {

  const currentDate = new Date().toJSON().slice(0, 10);
  console.log('currentDate', currentDate);

  const { data, error } = await supabase.from("check_in").select().is("child_id", null).gte("check_in_out_time", currentDate)
  if (error) throw error;

  return data || [];
};
