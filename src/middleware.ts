import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { AUTH_PATH_PREFIX, PATH, PUBLIC_PATH_PREFIX } from "@/config";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon\\.|robots\\.txt|sitemap\\.xml).*)"],
};