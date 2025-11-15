// proxy.ts
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "Linajafari@hotmail.fr";

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  // Protect all admin routes EXCEPT login and adminDash
  const isProtectedAdminRoute =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    pathname !== "/adminDash";

  if (isProtectedAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (session.user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL("/adminDash", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
