import CredentialsProvider from "next-auth/providers/credentials";
import {AxiosError, AxiosResponse} from "axios";
import {Token} from "@/types/auth/Token";
import {instance} from "@/lib/axios/Axios";
import {User} from "@/types/user";

export const PhoneCredentials = CredentialsProvider({
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
      const meReq: AxiosResponse<User> = await instance.get('me')
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
})
