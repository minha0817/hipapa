import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getReport = async (
  supabase: SupabaseClient<Database>,
  childId: string
) => {
  const { data: activityReport, error } = await supabase
    .from("activity_reports")
    .select()
    .eq("child_id", childId);




    return 
};

//4가지 리포트를 다 가져와서 
//그걸 다 합쳐서 리턴하기. 