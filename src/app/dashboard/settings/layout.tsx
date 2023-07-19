"use client"

import {Menu} from "@/lib/daisyUi"
import NextLink from "next/link";
import {usePathname} from "next/navigation";

interface Link {
  name: string;
  url: string;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const settingPages: Link[] = [
    {
      name: 'Аккаунт',
      url: '/dashboard/settings'
    },
    {
      name: 'Информация о магазине',
      url: '/dashboard/settings/storeInformation'
    },
    {
      name: 'Данные компании',
      url: '/dashboard/settings/companyData'
    },
  ]

  return (
    <>
      <div className="flex flex-row h-full w-full gap-x-6">
        <Menu className="shadow-xl rounded-box w-[18rem] max-h-full bg-base-100 gap-1">
          <Menu.Title>
            <span>Управление аккаунтом</span>
          </Menu.Title>
          {settingPages.map((item, key) => (
            <Menu.Item key={key}>
              <NextLink className={pathname === item.url ? "active" : ""} href={item.url}>{item.name}</NextLink>
            </Menu.Item>
          ))}
        </Menu>

        <div className="shadow-xl rounded-box w-full max-h-full bg-base-100 p-2">
          {children}
        </div>
      </div>
    </>
  )
}
