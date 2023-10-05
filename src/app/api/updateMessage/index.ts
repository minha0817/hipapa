import "server-only";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/supabase.types";
import { UpdateMessageRequest } from "./types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";

export const updateMessage = async (
  supabase: SupabaseClient<Database>,
  body: UpdateMessageRequest
) => {
  const user = await getCurrentUser(supabase);

  const { error } = await supabase.from("messages").upsert({
    message_id: body.messageId,
    body: body.body.trim(),
    messages_room_id: body.messageRoomId,
    updated_at: new Date().toISOString(),
    message_from: user!.id,
  });

  if (error) throw error;

  return true;
};
