import "server-only";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/supabase.types";
import { DeleteMessageRequest } from "./types";

export const deleteMessage = async (
  supabase: SupabaseClient<Database>,
  body: DeleteMessageRequest
) => {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("message_id", body.messageId);
  if (error) throw error;
};
