import { AddAdminMessagsRoomModalForm } from "@/components/adminMessages/addAdminMessagesRoomModal/addAdminMessagesRoomModal.types";
import { Database } from "@/supabase.types";
import { getCurrentUser } from "@/utils/supabaseHelper.utils";
import { SupabaseClient } from "@supabase/supabase-js";

export const createMessage = async (
  supabase: SupabaseClient<Database>,
  body: { values: AddAdminMessagsRoomModalForm }
) => {
  const values = body.values;
  // Get user.
  const user = await getCurrentUser(supabase);

  // Get daycareId.
  const { data: daycareId, error: daycareIdError } = await supabase
    .from("children")
    .select("daycare_id")
    .eq("child_id", values.childrenIds[0])
    .single();

  if (daycareIdError) throw daycareIdError;

  // Transform data to insert into messages_room table.
  const messagesRoomData = values.childrenIds.map((id) => {
    return {
      daycare_id: daycareId.daycare_id,
      title: values.title,
      child_id: id,
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
        body: values.body,
      };
    }
  );

  // Insert into messages.
  const { data, error: messagesError } = await supabase
    .from("messages")
    .insert(messagesData);
  if (messagesError) throw messagesError;
};
