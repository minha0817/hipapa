import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "./index";
import { CreateMessageRequest } from "./types";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as CreateMessageRequest;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await createMessage(supabase, body);

  return NextResponse.json(true);
}
