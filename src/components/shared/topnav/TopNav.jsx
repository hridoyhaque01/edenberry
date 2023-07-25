import React from "react";
import { useDispatch } from "react-redux";
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
            className="menu menu-compact dropdown-content mt-3 shadow-sm rounded-md w-40 bg-white px-0"
          >
            <li>
              <button
                className="active:bg-primaryMain flex items-center gap-1 text-black hover:text-black "
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined">Logout</span>
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
