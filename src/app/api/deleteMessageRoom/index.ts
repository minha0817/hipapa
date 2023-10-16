import "server-only";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/supabase.types";
import { DeleteMessageRoomRequest } from "./types";

export const deleteMessageRoom = async (
  supabase: SupabaseClient<Database>,
  body: DeleteMessageRoomRequest
) => {
  const { error } = await supabase
    .from("messages_room")
    .delete()
    .eq("messages_room_id", body.messageRoomId);
  if (error) throw error;
};
