import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const auth = localStorage.getItem("authToken");
  const LogOutButton = () => {};
  return (
    <>
      <nav className="bg-shamrock-green fixed w-full py-4 z-10">
        <div className="max-w-5xl lg:max-w-7xl mx-auto">
          <div className="flex justify-between">
            <NavLink to="/" className="flex items-center text-white mx-3">
              <span className="text-xl font-bold">Daily Report</span>
            </NavLink>
            {props.loggedIn || auth ? (
              <button className="mx-3 font-medium text-white hover:text-midnight">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
