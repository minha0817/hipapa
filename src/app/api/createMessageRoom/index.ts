import { AddAdminMessagsRoomModalForm } from "@/components/messages/adminMessage/addAdminMessagesRoomModal/addAdminMessagesRoomModal.types";
import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";

export const createMessageRoom = async (
  supabase: SupabaseClient<Database>,
  body: AddAdminMessagsRoomModalForm
) => {
  // Get user.
  const user = await getCurrentUser(supabase);

  // Get daycareId.
  const { data: daycareId, error: daycareIdError } = await supabase
    .from("children")
    .select("daycare_id")
    .eq("child_id", body.childrenIds[0])
    .single();

  if (daycareIdError) throw daycareIdError;

  // Transform data to insert into messages_room table.
  const messagesRoomData = body.childrenIds.map((id) => {
    return {
      daycare_id: daycareId.daycare_id,
      title: body.title,
      child_id: id,
      created_by: user?.id,
    };
  });

  // Insert into messages_room.
  const { data: messagesRoomIds, error: messagesRoomError } = await supabase
    .from("messages_room")
    .insert(messagesRoomData)
    .select("messages_room_id");

  if (messagesRoomError) throw messagesRoomError;

  if (!messagesRoomIds) return;

  const messagesData = messagesRoomIds.map(
    (idObj: { messages_room_id: string }) => {
      return {
        messages_room_id: idObj.messages_room_id,
        message_from: user!.id,
        body: body.body,
        updated_at: new Date().toISOString()
      };
    }
  );

  // Insert into messages.
  const { data, error: messagesError } = await supabase
    .from("messages")
    .insert(messagesData);
  if (messagesError) throw messagesError;

  //Insert into check_message
  const { error } = await supabase.from("check_messages").insert(
    messagesRoomIds.map((roomId) => ({
      user_id: user!.id,
      last_read_time: new Date().toISOString(),
      messages_room_id: roomId.messages_room_id,
    }))
  );
  
};
