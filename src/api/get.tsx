import { Child, Daycare, Teacher } from "@/dbModels/types";
import { SupabaseClient } from "@supabase/supabase-js";


export const getDaycares = async (supabase: SupabaseClient): Promise<Daycare[]> => {
  const { data: daycares, error } = await supabase.from("daycare").select();
  return daycares || [];
};

export const getTeachers = async (supabase: SupabaseClient): Promise<Teacher[]> => {
  const { data: teachers, error } = await supabase.from("teacher").select(`*`);
  return teachers || []
};



export const getChildren = async (supabase: SupabaseClient): Promise<Child[]> => {
  const { data: children, error } = await supabase.from("child").select(`*`);
  return children || []
};