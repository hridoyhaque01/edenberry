import React from "react";
import ProductModal from "../../components/modals/ProductModal";
import { wellness1 } from "../../utils/getImages";

function ListedProducts() {
  return (
    <>
      <section className="pb-10">
        <div className="grid grid-cols-3 gap-6">
          <div
            className=" rounded-xl overflow-hidden shadow-lg"
            data-hs-overlay="#product-modal"
          >
            <div>
              <img
                src={wellness1}
                alt=""
                className="h-96 bg-center object-cover"
              />
            </div>
            <div className="py-4 px-3">
              <h4 className="text-base text-dark font-semibold font-mont">
                Nutrition
              </h4>
              <p className="text-fadeHigh font-mont">
                Lorem ipsum dolor sit amet consectetur. Scelerisque commodo nec
                viverra condimentum. Nunc tellus. m dolor sit amet consectetur.
                Scelerisque commodo nec viverra condimentu
              </p>
            </div>
          </div>
        </div>
      </section>
      <ProductModal></ProductModal>
    </>
  );
}

export default ListedProducts;
