import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

export const getMessagesRoom = async (
  supabase: SupabaseClient<Database>,
  daycareId: string
) => {
  const { data, error } = await supabase
    .from("messages_room")
    .select(
      "messages_room_id, daycare_id, created_at, title, children(child_id, name)"
    )
    .eq("daycare_id", daycareId);
  if (error) throw error;
  return data.map((x) => {
    return {
      messageRoomId: x.messages_room_id,
      daycareId: x.daycare_id,
      childId: x.children?.child_id,
      childName: x.children?.name,
      createdAt: DateTime.fromISO(x.created_at, {zone: 'America/Los_Angeles'}).toFormat('yyyy-MM-dd hh:mm'),
      title: x.title,
    };
  });
};
