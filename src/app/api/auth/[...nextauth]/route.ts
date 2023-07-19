import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {instance} from "@/lib/axios/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {Token} from "@/types/auth/Token";
import {User} from "@/types/user";
import {PhoneCredentials} from "@/lib/nextAuth/providers/phoneCredentials";
import {RegisterCredentials} from "@/lib/nextAuth/providers/registerCredentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    PhoneCredentials,
    RegisterCredentials,
  ],
  callbacks: {
    async jwt({token, user, trigger, session}) {
      if (trigger === 'update') {
        return {...token, ...session.user}
      }

      return {...token, ...user}
    },

    async session({ session, token, user }) {
      session.user = token
      return session
    }

  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
