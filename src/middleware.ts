import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";


export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();


  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/admin/home", req.url));
  // }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (user) {
    await supabase.auth.getSession();
  }
  return res;
}

export const config = {
  matcher: ["/", "/admin/home"],
};
