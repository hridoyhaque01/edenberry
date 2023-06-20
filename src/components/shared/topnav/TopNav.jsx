import React from "react";
import { Link } from "react-router-dom";
import { avater, logo } from "../../../utils/getImages";

const TopNav = () => {
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
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0005 21.75C13.1005 21.75 14.0005 20.85 14.0005 19.75H10.0005C10.0005 20.85 10.8905 21.75 12.0005 21.75ZM18.0005 15.75V10.75C18.0005 7.68 16.3605 5.11 13.5005 4.43V3.75C13.5005 2.92 12.8305 2.25 12.0005 2.25C11.1705 2.25 10.5005 2.92 10.5005 3.75V4.43C7.63054 5.11 6.00054 7.67 6.00054 10.75V15.75L4.71054 17.04C4.08054 17.67 4.52054 18.75 5.41054 18.75H18.5805C19.4705 18.75 19.9205 17.67 19.2905 17.04L18.0005 15.75Z"
                  fill="#ffffff"
                />
              </svg>
              <span className="badge badge-sm rounded-full bg-secondaryColor text-white border-none indicator-item">
                5
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">5 New</span>
              <span className="text-info">New order recieved!</span>
              <span className="text-info">New order recieved 2!</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-sm btn-block">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* user avater */}
        <div className="dropdown dropdown-end">
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
              <button className="active:bg-primaryMain">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
