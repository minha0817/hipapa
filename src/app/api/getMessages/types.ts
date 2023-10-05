import { Database } from "@/supabase.types";

export type MessageType = {
  messageId: string;
  updatedAt: string;
  body: string;
  messageRoomId: string;
  fromUserId: string;
  fromUserType: Database["public"]["Enums"]["user_type"];
};
