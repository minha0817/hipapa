import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {createMessageRoom} from "./index";

export async function POST (req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  await createMessageRoom(supabase, body)

  return NextResponse.json(true);
}
