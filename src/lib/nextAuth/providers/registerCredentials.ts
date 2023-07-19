import CredentialsProvider from "next-auth/providers/credentials";
import {AxiosError, AxiosResponse} from "axios";
import {instance} from "@/lib/axios/Axios";
import {User} from "@/types/user";

export const RegisterCredentials = CredentialsProvider({
  id: "registerCredentials",
  type: "credentials",
  name: "Sign Up",
  credentials: {
    phone: {label: "Email", type: "string",},
    code: { label: "Code confirmation", type: "string"},
  },
  async authorize(credentials) {
    const {
      phone,
      code,
    } = credentials as {
      phone: string, code: string,firstName: string,
      lastName: string, password: string, passwordConfirmation: string,
    }

    try {
      const signUpReq = await instance.post('/register/sign-up', {phone, code})
      const token = await signUpReq.data

      instance.defaults.headers.common['Authorization'] = 'Bearer ' + token.accessToken;
      const meReq: AxiosResponse<User> = await instance.get('me')
      const user = await meReq.data

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
