import React from "react";
import { Link } from "react-router-dom";

function AddButton({ path, name }) {
  return (
    <Link
      to={path}
      className="flex items-center gap-1 bg-primaryColor rounded-xl max-w-max whitespace-nowrap py-4 px-6 text-white capitalize"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.833 6.16683H7.83301V1.16683C7.83301 0.706829 7.45967 0.333496 6.99967 0.333496C6.53967 0.333496 6.16634 0.706829 6.16634 1.16683V6.16683H1.16634C0.706341 6.16683 0.333008 6.54016 0.333008 7.00016C0.333008 7.46016 0.706341 7.8335 1.16634 7.8335H6.16634V12.8335C6.16634 13.2935 6.53967 13.6668 6.99967 13.6668C7.45967 13.6668 7.83301 13.2935 7.83301 12.8335V7.8335H12.833C13.293 7.8335 13.6663 7.46016 13.6663 7.00016C13.6663 6.54016 13.293 6.16683 12.833 6.16683Z"
          fill="#FAFAFA"
        />
      </svg>
      <span className="font-mont font-semibold">{name}</span>
    </Link>
  );
}

export default AddButton;
