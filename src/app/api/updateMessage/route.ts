import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UpdateMessageRequest } from "./types";
import { updateMessage } from ".";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as UpdateMessageRequest;
  // validation

  const supabase = createRouteHandlerClient({ cookies });

  await updateMessage(supabase, body);
  return NextResponse.json(true);
}
