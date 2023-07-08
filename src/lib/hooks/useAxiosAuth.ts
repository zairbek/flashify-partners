'use client'

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {instanceAuth} from "@/lib/axios/Axios";
import useRefreshToken from "@/lib/hooks/useRefreshToken";

const useAxiosAuth = () => {
  const {data: session} = useSession()
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = instanceAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${session?.user.token.accessToken}`
        }
        return config;
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = instanceAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await refreshToken()
          prevRequest.headers['Authorization'] = `Bearer ${session?.user.token.accessToken}`
          return instanceAuth(prevRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      instanceAuth.interceptors.request.eject(requestIntercept)
      instanceAuth.interceptors.response.eject(responseIntercept)
    }
  }, [session])

  return instanceAuth;
}

export default useAxiosAuth;
