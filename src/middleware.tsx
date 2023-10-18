import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function Middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const url = request.nextUrl.clone();
  if (!token) {
    if (request.nextUrl.pathname.startsWith("/signin")) {
      return NextResponse.rewrite(new URL("/signin", request.url));
    } else if(request.nextUrl.pathname.startsWith("/admin")){
      return NextResponse.rewrite(new URL("/signin", request.url));
  } else {
    if (url.pathname === "/signin") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}
}