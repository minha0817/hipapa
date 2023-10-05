import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { CreateMessageRequest } from "./types";

export const createMessage = async (
  supabase: SupabaseClient<Database>,
  body: CreateMessageRequest
) => {
  const user = await getCurrentUser(supabase);

  const {messageRoomId, values} = body
  const messageData = {
    messages_room_id: messageRoomId,
    message_from: user!.id,
    body: values.message,
    attachment: values.attatchment
  };

  const { error } = await supabase.from("messages").insert(messageData);
  if (error) throw error;
};
