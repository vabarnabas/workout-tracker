import { NextRequest, NextResponse } from "next/server"
import TokenService from "./services/token.service"
import { verify } from "./services/verifyToken"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")

  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next()
  }

  if (
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.includes("_")
  ) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    try {
      verify(token, "at-secret")
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }
}
