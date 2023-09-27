import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getMessagesRoom } from "./index";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { daycareId } = body;
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    return NextResponse.json(await getMessagesRoom(supabase, daycareId));
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return NextResponse.json("Unknown Error", {
      status: 500,
      statusText: "UNKNOWN",
    });
  }
}
