import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteMessageRoom } from ".";
import { DeleteMessageRoomRequest } from "./types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as DeleteMessageRoomRequest;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await deleteMessageRoom(supabase, body);
  return NextResponse.json(true);
}
