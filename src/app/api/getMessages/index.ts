import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";

export const getMessages = async (
  supabase: SupabaseClient<Database>,
  messageRoomId: string
) => {
  const { data, error } = await supabase
    .from("messages")
    .select()
    .eq("messages_room_id", messageRoomId);

  if (error) throw error;
  return data.map((x) => {
    return {
      messageId: x.message_id,
      createdAt: DateTime.fromISO(x.created_at, {
        zone: "America/Los_Angeles",
      }).toFormat("yyyy-MM-dd hh:mm"),
      body: x.body,
      messageFrom: x.message_from,
      messageRoomId: x.messages_room_id,
    };
  });
};
