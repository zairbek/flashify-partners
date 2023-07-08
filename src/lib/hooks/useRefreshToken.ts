import {useSession} from "next-auth/react";
import {instance} from "@/lib/axios/Axios";
import {AxiosResponse} from "axios";
import {Token} from "@/types/auth/Token";

const useRefreshToken = () => {
  const {data: session} = useSession()

  const refreshToken = async () => {
    const res: AxiosResponse<Token> = await instance.post('auth/refresh-token', {
      refreshToken: session?.user.token.refreshToken
    })

    if (session) {
      session.user.token = res.data
    }
  }

  return refreshToken
}

export default useRefreshToken;
