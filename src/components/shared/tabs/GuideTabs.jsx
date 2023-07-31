import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../../features/services/guidesSlice";

function GuideTabs() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.guides);

  const handleTab = (tabValue) => {
    dispatch(changeTab(tabValue));
  };

  console.log(activeTab);

  return (
    <div className="text-fadeHigh ">
      <nav
        className="flex space-x-2 text-base leading-5 whitespace-nowrap font-semibold"
        aria-label="Tabs"
        role="tablist"
      >
        <button
          type="button"
          className={`hs-tab-active:font-bold hs-tab-active:text-dark hs-tab-active:text-2xl py-2 px-4 inline-flex items-center ${
            activeTab === "postpartum" ? "active" : ""
          }`}
          id="tabs-with-underline-item-8"
          data-hs-tab="#Guide-tab-01"
          aria-controls="Guide-tab-01"
          role="tab"
          onClick={() => handleTab("postpartum")}
        >
          Postpartum
        </button>
        <button
          type="button"
          className={`hs-tab-active:font-bold hs-tab-active:text-dark hs-tab-active:text-2xl py-2 px-4 inline-flex items-center ${
            activeTab === "prenatal" ? "active" : ""
          }`}
          id="tabs-with-underline-item-9"
          data-hs-tab="#Guide-tab-02"
          aria-controls="Guide-tab-02"
          role="tab"
          onClick={() => handleTab("prenatal")}
        >
          Prenatal
        </button>
      </nav>
    </div>
  );
}

export default GuideTabs;
