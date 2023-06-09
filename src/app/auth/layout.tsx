"use client"

import {Card} from "@/lib/daisyUi"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-[75%] w-full justify-center items-center gap-10">
      <div>
        logo
      </div>
      {children}
    </div>
  )
}
