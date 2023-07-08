import React from "react";
import useCheckAuth from "@/lib/hooks/useCheckAuth";
import Page401 from "@/components/features/ErrorPages/401/Page401";


export default async function Dashboard() {
  const auth = await useCheckAuth()
  const isAuth = await auth()
  if (!isAuth) {
    return <Page401/>
  }


  return (
    <>
      <p>asdfs</p>
    </>
  )
}
