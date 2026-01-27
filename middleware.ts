import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { pathname } = req.nextUrl

    // Public routes
    if (pathname === "/auth/login") {
        if (req.auth) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        return NextResponse.next()
    }

    // Redirect legacy login to new auth login
    if (pathname === "/login") {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Protected routes - only protect /dashboard and related admin paths
    const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/settings") // Add other protected roots as needed

    if (isProtected && !req.auth) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
}
