import React from "react";
import { useDispatch } from "react-redux";
import { changeActiveProduct } from "../../../features/products/productSlice";

function ProductCard({ details }) {
  const { fileUrl, productName, description } = details || {};
  const dispatch = useDispatch();
  return (
    <div
      className=" rounded-xl overflow-hidden shadow-lg"
      data-hs-overlay="#product-modal"
      onClick={() => dispatch(changeActiveProduct(details))}
    >
      <div>
        <img
          src={fileUrl}
          alt=""
          className="h-96 bg-center object-cover w-full"
        />
      </div>
      <div className="py-4 px-3">
        <h4 className="text-base text-dark font-semibold font-mont">
          {productName}
        </h4>
        <p className="text-fadeHigh font-mont">{description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
