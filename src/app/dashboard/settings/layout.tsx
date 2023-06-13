"use client"

import {Menu} from "@/lib/daisyUi"
import NextLink from "next/link";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-row h-full w-full gap-x-6">
        <Menu className="shadow-xl rounded-box w-[18rem] max-h-full bg-base-100 gap-1">
          <Menu.Title>
            <span>Управление аккаунтом</span>
          </Menu.Title>
          <Menu.Item>
            <NextLink href="/dashboard/settings/account">Аккаунт</NextLink>
          </Menu.Item>
          <Menu.Item>
            <NextLink href="/dashboard/settings/aboutCompany">Информация о компании</NextLink>
          </Menu.Item>
          <Menu.Item>
            <NextLink href="/dashboard/settings/companyDocuments">Документы компании</NextLink>
          </Menu.Item>
          <Menu.Item>
            <NextLink href="/dashboard/settings/paymentDetails">Платежные реквизиты</NextLink>
          </Menu.Item>
        </Menu>

        <div className="shadow-xl rounded-box w-full max-h-full bg-base-100 p-2">
          {children}
        </div>
      </div>
    </>
  )
}
