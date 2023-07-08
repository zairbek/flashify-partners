import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const useCheckAuth = async () => {
  return async () => {
    const session = await getServerSession(authOptions);

    return !!session
  }
}

export default useCheckAuth;
