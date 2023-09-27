import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getMessagesRoom = async (
  supabase: SupabaseClient<Database>,
  daycareId: string
) => {
  const { data, error } = await supabase
    .from("messages_room")
    .select()
    .eq("daycare_id", daycareId);
  if (error) throw error;
  return data.map((x) => {
    return {
      messagesRoomId: x.messages_room_id,
      daycareId: x.daycare_id,
      childId: x.child_id,
      createdAt: x.created_at,
      title: x.title,
    };
  });
};
