import { NextRequest, NextResponse } from "next/server"
import { verify } from "./services/verifyToken"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("wt-token")

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token === undefined || token === "undefined") {
      req.cookies.delete("wt-token")
    }
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next()
  }

  if (!req.nextUrl.pathname.startsWith("/login")) {
    if (token === undefined || token === "undefined") {
      req.cookies.delete("wt-token")
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      await verify(token, "at-secret")
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
}
