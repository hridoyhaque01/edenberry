import React from "react";
import { Link } from "react-router-dom";

export default function FormTitle({ path, title }) {
  return (
    <div>
      <Link
        to={path}
        className="flex items-center gap-4 max-w-max whitespace-nowrap"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.3331 16C29.3331 16.736 28.7371 17.3334 27.9998 17.3334H7.21851L14.2758 24.3907C14.7971 24.912 14.7971 25.7548 14.2758 26.2761C14.0158 26.5361 13.6744 26.6667 13.3331 26.6667C12.9918 26.6667 12.6504 26.5361 12.3904 26.2761L3.05836 16.9441C2.93436 16.8201 2.83697 16.6735 2.76897 16.5095C2.6343 16.1842 2.6343 15.8159 2.76897 15.4906C2.83697 15.3266 2.93436 15.18 3.05836 15.056L12.3904 5.72401C12.9117 5.20267 13.7545 5.20267 14.2758 5.72401C14.7971 6.24534 14.7971 7.08809 14.2758 7.60942L7.21851 14.6667H27.9998C28.7371 14.6667 29.3331 15.264 29.3331 16Z"
            fill="#181A20"
          />
        </svg>

        <span className="text-dark text-xl">{title}</span>
      </Link>
    </div>
  );
}
