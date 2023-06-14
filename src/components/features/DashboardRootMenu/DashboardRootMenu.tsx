import React from 'react';
import NextLink from "next/link";
import {usePathname} from "next/navigation";

interface Link {
  name: string;
  url: string;
}

const DashboardRootMenu = () => {
  const pathname = usePathname()
  const rootMenu: Link[] = [
    {
      name: 'Главная',
      url: '/dashboard',
    },
    {
      name: 'Товары и цены',
      url: '/dashboard/products',
    },
    {
      name: 'Заказы',
      url: '/dashboard/orders',
    },
    {
      name: 'Аналитика',
      url: '/dashboard/analytics',
    },
    {
      name: 'Рейтинги',
      url: '/dashboard/ratings',
    },
    {
      name: 'Отзывы',
      url: '/dashboard/reviews',
    },
  ]


  return (
    <ul className="menu menu-horizontal z-10 gap-x-1">
      {rootMenu.map((item, key) => (
        <li key={key}>
          <NextLink className={pathname === item.url ? 'active' : ''} href={item.url}>{item.name}</NextLink>
        </li>
      ))}
    </ul>
  );
};

export default DashboardRootMenu;
