import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";

export const createMessage = async (
  supabase: SupabaseClient<Database>,
  body: any
) => {
  const user = await getCurrentUser(supabase);

  const messageData = {
    messages_room_id: "",
    message_from: user!.id,
    body: "",
  };

  const { error } = await supabase.from("messages").insert(messageData);
  if (error) throw error;
};
