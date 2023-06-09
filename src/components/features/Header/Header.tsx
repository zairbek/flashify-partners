import React from 'react';
import {Link, Input, Navbar} from "@/lib/daisyUi/";

const Header = () => {
  return (
    <Navbar className="bg-base-100 rounded-2xl z-10 relative">
      <div className="flex-none">
        <a className="btn btn-ghost normal-case text-xl" href="/">daisyUI</a>
      </div>

      <div className="flex-1">
        <div className="form-control">
          <Input bordered placeholder="Search"/>
        </div>
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
              <Link className="btn btn-primary" href="/auth">Войти</Link>
              <Link className="btn btn-primary" href="/auth">Зарегистрироваться</Link>
            </>
          )
        }


      </div>
    </Navbar>
  );
};

export default Header;
