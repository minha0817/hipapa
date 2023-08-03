import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { PARENT_PATH_PREFIX, PATH, ADMIN_PATH_PREFIX } from "@/config";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const pathname = req.nextUrl.pathname;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = await supabase
    .from("user")
    .select("user_type")
    .eq("auth_id", user?.id)
    .single();
  const userType = userData.data?.user_type;

  if (!user) {
    if (pathname === "/") {
      return res;
    }

    if (
      pathname.startsWith(PARENT_PATH_PREFIX) ||
      pathname.startsWith(ADMIN_PATH_PREFIX)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (user) {
    await supabase.auth.getSession();

    if (userType === "admin" || userType === "teacher") {
      if (!pathname.startsWith(ADMIN_PATH_PREFIX)) {
        return NextResponse.redirect(new URL("/admin/home", req.url));
      }
    }

    if (userType === "parent") {
      if (!pathname.startsWith(PARENT_PATH_PREFIX)) {
        return NextResponse.redirect(new URL("/parent/home", req.url));
      }
    }
  }
  return res;
}

export const config = {
  matcher: ["/((?!api/|_next/|favicon\\.|robots\\.txt|sitemap\\.xml).*)"],
};
