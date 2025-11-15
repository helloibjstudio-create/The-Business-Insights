import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "Linajafari@hotmail.fr"; // CHANGE THIS

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // create supabase middleware client
  const supabase = createMiddlewareClient({ req, res });

  // This await is now valid because middleware is async
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Protect all admin routes except login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (session.user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
