// import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const host = req.headers.get("host");

//   // your production domain
//   const productionDomain = "the-business-insights.vercel.app";

//   if (host === productionDomain) {
//     // Rewrite ALL pages → maintenance page
//     return NextResponse.rewrite(new URL("/maintenance", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/:path*", // apply to all pages
// };
