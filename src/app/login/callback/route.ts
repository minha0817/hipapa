import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const userType = searchParams.get("userType") || "";
  console.log("userType", userType);
  const code = searchParams.get("code");
  if (code) {
    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    const { data: existUser } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    // sign in
    if (existUser && ["teacher", "admin"].includes(userType)) {
      return NextResponse.redirect(new URL("/admin/home", req.url));
    }

    if (existUser && userType === "parent") {
      return NextResponse.redirect(new URL("/parent/home", req.url));
    }

    //signup
    if (!existUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
