import React from 'react';
import {Avatar} from "@/lib/daisyUi";
import NextLink from "next/link";

const CircleAccountCard = () => {
  return (
    <>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <Avatar src="http://placebeard.it/70/70" shape="circle" size="xs"/>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <NextLink href="/dashboard/settings/account">Аккаунт</NextLink>
        </li>
        <li>
          <NextLink href="/dashboard/settings">Настройки</NextLink>
        </li>
        <li><a>Выйти из аккаунта</a></li>
      </ul>
    </div>
    </>
  );
};

export default CircleAccountCard;
