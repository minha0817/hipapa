import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { GetCheckMessageRequest } from "./types";

export const getCheckMessage = async (
  supabase: SupabaseClient<Database>,
  body: GetCheckMessageRequest
) => {
  const user = await getCurrentUser(supabase);

  //만약에 lastReadTime가 있으면 그 아래 로직을 그대로 하면 되고
  //없으면 return true로

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
    .gte("updated_at", lastReadTime.last_read_time)
    .limit(1);

  if (error) throw error;
  if (data.length) {
    return true;
  } else return false;
};
