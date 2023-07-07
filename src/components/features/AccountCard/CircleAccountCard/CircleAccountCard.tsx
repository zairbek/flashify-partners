import React from 'react';
import NextLink from "next/link";
import {signOut} from "next-auth/react";
import Avatar from "@/components/features/Avatar/Avatar";
import {User} from "@/types/user";

interface Props {
  user: User
}

const CircleAccountCard: React.FC<Props> = ({user}) => {
  return (
    <>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <Avatar user={user} shape="circle" size="xs"/>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <NextLink href="/dashboard/settings">Настройки</NextLink>
        </li>
        <li><a onClick={() => signOut()}>Выйти из аккаунта</a></li>
      </ul>
    </div>
    </>
  );
};

export default CircleAccountCard;
