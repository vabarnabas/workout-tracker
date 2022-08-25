import { NextRequest, NextResponse } from "next/server"
import TokenService from "./services/token.service"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")

  if (req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next()
  }

  // console.log(!token && !pagepath.includes("login"))
  console.log(token)

  if (
    !token &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.includes("_")
  ) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
