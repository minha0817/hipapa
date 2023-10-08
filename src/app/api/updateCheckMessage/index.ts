import "server-only";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { UpdateCheckMessage } from "./types";

export const updateCheckMessage = async (
  supabase: SupabaseClient<Database>,
  body: UpdateCheckMessage
) => {
  const user = await getCurrentUser(supabase);

  const { messageRoomId } = body;

  const { error } = await supabase.from("check_messages").upsert({
    user_id: user!.id,
    last_read_time: new Date().toISOString(),
    messages_room_id: messageRoomId,
  });

  if (error) throw error;

  return true;
};
