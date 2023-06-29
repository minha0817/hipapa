import { Daycare, Teacher } from "@/dbModels/types";
import { SupabaseClient } from "@supabase/supabase-js";


export const getDaycare = async (supabase: SupabaseClient): Promise<Daycare[]> => {
  const { data: daycare, error } = await supabase.from("daycare").select();
  if(daycare){
    return daycare
  } else {
    throw new Error("Daycares are not found");
  }
};

export const getTeachers = async (supabase: SupabaseClient): Promise<Teacher[]> => {
  const { data: teacher, error } = await supabase.from("teacher").select(`*`);

  if (teacher) {
    return teacher;
  } else {
    throw new Error("Teachers are not found");
  }
};
