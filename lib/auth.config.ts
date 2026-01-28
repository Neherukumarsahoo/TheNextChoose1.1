import type { NextAuthConfig } from "next-auth"
import { Role } from "@/lib/enums"

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role as Role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as Role
                session.user.id = token.id as string
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 3 * 60 * 60, // 3 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [],
} satisfies NextAuthConfig
