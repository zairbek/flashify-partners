import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {instance} from "@/lib/axios/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {Token} from "@/types/auth/Token";
import {Me} from "@/types/user/Me";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth',
  },
  providers: [
    CredentialsProvider({
      id: "phoneCredentials",
      type: "credentials",
      name: "Sign in",
      credentials: {
        phone: {label: "Email", type: "string",},
        code: { label: "Code confirmation", type: "string"},
      },
      async authorize(credentials) {
        const {phone, code} = credentials as {
          phone: string, code: string
        }

        try {
          const signInReq: AxiosResponse<Token> = await instance.post('auth/phone/sign-in', {phone, code})
          const token = await signInReq.data

          instance.defaults.headers.common['Authorization'] = 'Bearer ' + token.accessToken;
          const meReq: AxiosResponse<Me> = await instance.get('me')
          const user = await meReq.data

          console.log(user && token)

          if (user && token) {
            return {...user, token: token};
          }

          return null;
        } catch (e) {
          if (e instanceof AxiosError) {
            const response = e.response as AxiosResponse
            throw Error(JSON.stringify({message: response.data, status: response.status}))
          }
        }
      }
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      return {...token, ...user}
    },

    async session({ session, token, user }) {
      session.user = token
      return session
    }

  }
});

export { handler as GET, handler as POST };
