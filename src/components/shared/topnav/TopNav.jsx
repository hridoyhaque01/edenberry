import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../../features/auth/authSlice";
import { avater, logo } from "../../../utils/getImages";

const TopNav = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("hello");
    dispatch(userLoggedOut());
  };

  return (
    <div className="navbar bg-primaryColor px-10 py-5">
      {/* top nav left */}
      <div className="flex-1 text-whiteHigh">
        <div className="text-2xl w-36">
          <img src={logo} alt="" />
        </div>
      </div>
      {/* top nav right */}
      <div className="flex-none">
        {/* notification dropdown */}
        {/* user avater */}
        <div className="dropdown dropdown-end z-40">
          <label tabIndex={3} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={avater} alt="" />
            </div>
          </label>
          <ul
            tabIndex={3}
            className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-28"
          >
            <li>
              <Link
                to="/profile"
                className="justify-between active:bg-primaryMain"
              >
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
