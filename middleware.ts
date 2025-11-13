import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  // Replace this with your actual production domain
  const productionDomain = "the-business-insights.vercel.app";

  // If it's the production site, block it
  if (host === productionDomain) {
    return new NextResponse(
      "The production site is temporarily unavailable.",
      { status: 503 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // apply to all routes
};
