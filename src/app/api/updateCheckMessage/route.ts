import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UpdateCheckMessage } from "./types";
import { updateCheckMessage } from ".";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as UpdateCheckMessage;

  const supabase = createRouteHandlerClient({ cookies });

  await updateCheckMessage(supabase, body);
  return NextResponse.json(true);
}
