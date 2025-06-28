import { NextRequest, NextResponse } from "next/server"
// import { headers } from "next/headers"
// import { auth } from "@/lib/auth"
import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_|.*\\..*).*)"]
}
