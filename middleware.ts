import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // 1. Redirect non-www to www
  if (hostname === "loischloe.com.bd") {
    url.host = "www.loischloe.com.bd";
    return NextResponse.redirect(url, 301);
  }

  // 2. Block spam query parameter (?a=...)
  if (url.searchParams.has("a")) {
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
