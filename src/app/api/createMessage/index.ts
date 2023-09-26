import { AddAdminMessagsModalForm } from "@/components/adminMessages/addAdminMessagesModal/addAdminMessagesModal.types";
import { Database } from "@/supabase.types";
import { SupabaseClient } from "@supabase/supabase-js";

export const createMessage = async (
  supabase: SupabaseClient<Database>,
  values: AddAdminMessagsModalForm
) => {

  // Get daycareId
  const { data: daycareId, error: daycareIdError } = await supabase
    .from("children")
    .select("daycare_id")
    .eq("child_id", values.childrenIds[0])
    .single()

  if (daycareIdError) throw daycareIdError;

  // Transform data to insert into messages_room table.
  const messagesRoomData = values.childrenIds.map((id) => {
    return {
      daycare_id: daycareId.daycare_id,
      title: values.title,
      child_id: id
    };
  });

  const {data: messagesRoomIds, error: messagesRoomError} = await supabase.from("messages_room").insert(messagesRoomData)

};




//   const { error } = await supabase
//     .from("meal_reports")
//     .insert(mealData)

//   if(error) throw error;
