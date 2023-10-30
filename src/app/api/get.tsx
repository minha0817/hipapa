import { Daycare, Teacher } from "@/dbModels/types";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Child } from "@/app/api/getChild/types";

export const getDaycares = async (
  supabase: SupabaseClient<Database>
): Promise<Daycare[]> => {
  const { data: daycares, error } = await supabase.from("daycares").select();
  return daycares || [];
};

export const getTeachers = async (
  supabase: SupabaseClient<Database>
): Promise<Teacher[]> => {
  const { data: teachers, error } = await supabase.from("teachers").select();
  return teachers || [];
};

export const getChildren = async (
  supabase: SupabaseClient<Database>
): Promise<Child[]> => {
  const { data: children, error } = await supabase.from("children").select();

  return (
    children?.map((child) => ({
      childId: child.child_id,
      daycareId: child.daycare_id,
      parentId: child.parent_id,
      name: child.name,
      isActive: child.is_active,
      checkIn: null,
    })) || []
  );
};
