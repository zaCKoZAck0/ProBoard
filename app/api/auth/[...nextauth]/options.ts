import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials';
import { GithubProfile } from "next-auth/providers/github";
import { GoogleProfile } from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { randomBytes, randomUUID } from "crypto";

const prisma = new PrismaClient();


export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        // GoogleProvider({
        //     profile(profile: GoogleProfile) {
        //         console.log(profile)
        //         return {
        //             role: profile.role ?? "USER",
        //             id: profile.sub,
        //             name: profile.name,
        //             email: profile.email,
        //             image: profile.picture,
        //         }
        //     },
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        // }),
        GitHubProvider({
            profile(profile: GithubProfile) {
                console.log(profile);
                return {
                    role: profile.role ?? "USER",
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
    session({ session, user }) {
        session.user.role = user.role;
        session.user.id = user.id;
        return session;
        },
    async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
    },
    session: {
  // Choose how you want to save the user session.
  // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  // If you use an `adapter` however, we default it to `"database"` instead.
  // You can still force a JWT session by explicitly defining `"jwt"`.
  // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  // which is used to look up the session in the database.
    strategy: "database",

  // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

  // Seconds - Throttle how frequently to write to database to extend a session.
  // Use it to limit write operations. Set to 0 to always update the database.
  // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

  // The session token is usually either a random UUID or string, however if you
  // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
        return randomUUID?.() ?? randomBytes(32).toString("hex");
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify', // (used for check email message)
        newUser: '/profile/edit' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}