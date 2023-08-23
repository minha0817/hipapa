import { SupabaseClient } from "@supabase/supabase-js";

export const createCheckIn = async (
  supabase: SupabaseClient,
  inputValues: any
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!user) throw new Error("Invalid User");
  
  const { data, error } = await supabase.from("check_in").upsert(inputValues);
  if (error) throw error;
};

export const getTeacherCheckIn = async (supabase: SupabaseClient) => {
  const currentDate = new Date().toJSON().slice(0, 10);

  const { data, error } = await supabase
    .from("check_in")
    .select()
    .is("child_id", null)
    .gte("check_in_out_time", currentDate);
  if (error) throw error;

  return data || [];
};

export const getChildrenCheckIn = async (supabase: SupabaseClient) => {
  const currentDate = new Date().toJSON().slice(0, 10);

  const { data, error } = await supabase
    .from("check_in")
    .select()
    .is("teacher_id", null)
    .gte("check_in_out_time", currentDate);
  if (error) throw error;

  return data || [];
};
