import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getReport } from ".";

export async function POST(): Promise<NextResponse> {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    return NextResponse.json(await getReport(supabase));
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return NextResponse.json(error, {
      status: 500,
      statusText: "UNKNOWN",
    });
  }
}
