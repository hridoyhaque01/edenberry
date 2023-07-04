import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ item, navigateUrl }) {
  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate(navigateUrl, {
      state: {
        type: "edit",
        data,
      },
    });
  };

  return (
    <div
      className=" rounded-xl overflow-hidden shadow-lg"
      onClick={() => handleNavigate(item)}
    >
      <div>
        <img
          src={item?.fileUrl || item?.imageUrl}
          alt=""
          className="h-96 bg-center object-cover w-full bg-cover "
        />
      </div>
      <div className="py-4 px-3">
        <h4 className="text-base text-dark font-semibold font-mont">
          {item?.title}
        </h4>
        <p className="text-fadeHigh font-mont">{item?.description}</p>
      </div>
    </div>
  );
}
