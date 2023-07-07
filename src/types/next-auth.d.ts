import NextAuth from "next-auth";
import {User} from "@/types/user";
import {Token} from "@/types/auth/Token";

interface MeToken extends User {
  token: Token
}

declare module 'next-auth' {
  interface Session extends User {
    user: MeToken
  }
}
