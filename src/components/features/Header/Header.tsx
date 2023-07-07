'use client'

import React, {useState} from 'react';
import NextLink from "next/link";
import {Drawer, Navbar, Button} from "@/lib/daisyUi/";
import AccountCard from "@/components/features/AccountCard/AccountCard";
import {Divider} from "react-daisyui";
import CircleAccountCard from "@/components/features/AccountCard/CircleAccountCard/CircleAccountCard";
import DashboardRootMenu from "@/components/features/DashboardRootMenu/DashboardRootMenu";
import {signIn, useSession} from "next-auth/react";

const Header = () => {
  const session = useSession();
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const side = (
    <>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li>
        {session.status === 'authenticated'
          ? <AccountCard user={session.data.user}/>
          : (
            <div>
              <Button size="sm" color="primary" className="normal-case" onClick={() => signIn()}>Войти</Button>
              <NextLink className="btn btn-primary btn-sm normal-case" onClick={() => toggleVisible()} href="/auth/registration">Зарегистрироваться</NextLink>
            </div>
          )
        }

      </li>
      <Divider className="my-1"/>
      <li><a>Sidebar Item 2</a></li>
    </ul>
    </>
);

  return (
    <>
      <Navbar className="bg-base-100 rounded-2xl z-10 sticky top-1">
        <div className="flex-none">
          <Drawer mobile side={side} open={visible} onClickOverlay={toggleVisible} sideClassName="">
            <Button shape="square" color="ghost" className="md:hidden" onClick={toggleVisible}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </Button>
          </Drawer>
        </div>

        <div className="flex-none">
          <a className="btn btn-ghost normal-case text-xl" href="/">daisyUI</a>
        </div>

        <div className="flex-1"></div>

        <div className="flex-none gap-2">
          {session.status === 'authenticated'
            ? (<CircleAccountCard user={session.data.user}/>)
            : (
              <>
                <div className="hidden md:flex gap-1">
                  <Button color="primary" onClick={() => signIn()}>Войти</Button>
                  <NextLink className="btn btn-primary" href="/auth/registration">Зарегистрироваться</NextLink>
                </div>
              </>
            )
          }


        </div>
      </Navbar>

      {session.status === 'authenticated' && (<DashboardRootMenu/>)}
    </>
  );
};

export default Header;
