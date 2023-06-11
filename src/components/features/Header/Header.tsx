import React from 'react';
import NextLink from "next/link";
import {Link, Navbar, Button} from "@/lib/daisyUi/";

const Header = () => {
  return (
    <Navbar className="bg-base-100 rounded-2xl z-10 sticky top-1">
      <div className="flex-none">
        <Button shape="square" color="ghost" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
        </Button>
      </div>

      <div className="flex-none">
        <a className="btn btn-ghost normal-case text-xl" href="/">daisyUI</a>
      </div>

      <div className="flex-1">

      </div>


      <div className="flex-none gap-2">
        {false
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
