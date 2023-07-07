'use client'

import React from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {

  const session = useSession()
  console.log(session)

  return (
    <>
    </>
  )
}
