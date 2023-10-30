import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

export const getMessageRoomsByChild = async (
  supabase: SupabaseClient<Database>,
  childId: string
) => {
  const { data, error } = await supabase
    .from("messages_room")
    .select(
      "messages_room_id, daycare_id, created_at,created_by, title, children(child_id, name)"
    )
    .eq("child_id", childId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((x) => {
    return {
      messageRoomId: x.messages_room_id,
      daycareId: x.daycare_id,
      childId: x.children?.child_id,
      childName: x.children?.name,
      createdAt: DateTime.fromISO(x.created_at).toFormat("yyyy-MM-dd hh:mm a"),
      title: x.title,
      createdBy: x.created_by,
    };
  });
};
