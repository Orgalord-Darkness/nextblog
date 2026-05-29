 import { NextRequest, NextResponse } from "next/server"
  import { jwtVerify } from "jose"

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

  export async function proxy(request: NextRequest) {
      const token = request.cookies.get("session")?.value

      if (!token) {
          return NextResponse.redirect(new URL("/login", request.url))
      }

      try {
          const { payload } = await jwtVerify(token, secret)

          if (request.nextUrl.pathname.startsWith("/admin") && payload.role !== "ADMIN") {
              return NextResponse.redirect(new URL("/user", request.url))
          }
      } catch {
          return NextResponse.redirect(new URL("/login", request.url))
      }

      return NextResponse.next()
  }

  export const config = {
      matcher: ["/admin/:path*", "/user/:path*"],
  }