'use client'

import React, {useState} from 'react';
import NextLink from "next/link";
import {Drawer, Navbar, Button} from "@/lib/daisyUi/";
import AccountCard from "@/components/features/AccountCard/AccountCard";
import {Divider} from "react-daisyui";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const side = (
    <>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li>
        {authenticated
          ? <AccountCard/>
          : (
            <div>
              <NextLink className="btn btn-primary btn-sm normal-case" onClick={() => toggleVisible()} href="/auth">Войти</NextLink>
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
        {authenticated
          ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><a>Logout</a></li>
                </ul>
              </div>
            </>
          )
          : (
            <>
              <div className="hidden md:flex gap-1">
                <NextLink className="btn btn-primary" href="/auth">Войти</NextLink>
                <NextLink className="btn btn-primary" href="/auth/registration">Зарегистрироваться</NextLink>
              </div>
            </>
          )
        }


      </div>
    </Navbar>
  );
};

export default Header;
