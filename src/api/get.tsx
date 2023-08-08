import { Child, Daycare, Teacher } from "@/dbModels/types";
import { SupabaseClient } from "@supabase/supabase-js";


export const getDaycares = async (supabase: SupabaseClient): Promise<Daycare[]> => {
  const { data: daycares, error } = await supabase.from("daycares").select();
  return daycares || [];
};

export const getTeachers = async (supabase: SupabaseClient): Promise<Teacher[]> => {
  const { data: teachers, error } = await supabase.from("teachers").select()
  return teachers || []
};

export const getChildren = async (supabase: SupabaseClient): Promise<Child[]> => {
  const { data: children, error } = await supabase.from("children").select();
  return children || []
};