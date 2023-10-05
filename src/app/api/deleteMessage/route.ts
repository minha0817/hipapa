import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { DeleteMessageRequest } from "./types";
import { deleteMessage } from ".";


export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as DeleteMessageRequest;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await deleteMessage(supabase, body)
  return NextResponse.json(true);
}
