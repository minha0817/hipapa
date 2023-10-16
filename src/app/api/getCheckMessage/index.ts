import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { GetCheckMessageRequest } from "./types";

export const getCheckMessage = async (
  supabase: SupabaseClient<Database>,
  body: GetCheckMessageRequest
) => {
  const user = await getCurrentUser(supabase);

  const { data: lastReadTime, error: lastReadTimeError } = await supabase
    .from("check_messages")
    .select("last_read_time")
    .match({ messages_room_id: body.messageRoomId, user_id: user!.id })
    .single();

  if (!lastReadTime) {
    return true;
  }

  if (lastReadTimeError) throw lastReadTimeError;

  const { data, error } = await supabase
    .from("messages")
    .select()
    .match({ messages_room_id: body.messageRoomId, message_from: user!.id })
    .gte("updated_at", lastReadTime.last_read_time)
    .limit(1);

  if (error) {
    console.error(error)
    throw error;
  }

  if (data.length) {
    return true;
  } else return false;
};
