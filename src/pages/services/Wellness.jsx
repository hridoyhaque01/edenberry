import React from "react";
import WellnessModal from "../../components/modals/WellnessModal";
import { wellness1 } from "../../utils/getImages";

function Wellness() {
  return (
    <>
      <section className="pb-10">
        <div className="grid grid-cols-3 gap-6">
          <div className=" rounded-xl overflow-hidden shadow-lg">
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
        <div className="mt-11">
          <h4 className="text-xl font-mont font-semibold text-dark">
            Add Wellness{" "}
          </h4>
          <button
            type="button"
            className="flex items-center gap-1 text-primaryColor mt-8"
            data-hs-overlay="#wellness-modal"
          >
            <span className="material-symbols-outlined">add</span>
            <span className="text-sm font-mont font-semibold">Add New</span>
          </button>
        </div>
      </section>
      <WellnessModal></WellnessModal>
    </>
  );
}

export default Wellness;
