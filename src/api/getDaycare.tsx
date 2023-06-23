import { supabase } from "@/lib/supabaseClient";

// type Daycare = {
//   id: string;
//   created_at: string;
//   name: string;
//   phone_number: string;
//   address: string;
//   is_active: boolean
// }

export const getDaycare = async () => {
  const { data: daycare, error } = await supabase.from("daycare").select();
  return daycare;
};
