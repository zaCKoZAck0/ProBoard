import NextAuth, { DefaultSession } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string | undefined | null,
      id: string | undefined | null,
    } & DefaultSession["user"]
    }
    interface User extends AdapterUser{
        role: string;
    }
}