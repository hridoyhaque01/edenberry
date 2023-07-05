import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../../features/services/resourceSlice";

function ResourceTabs() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.resources);

  const handleTab = (tabValue) => {
    dispatch(changeTab(tabValue));
  };

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
          id="tabs-with-underline-item-6"
          data-hs-tab="#tabs-with-underline-6"
          aria-controls="tabs-with-underline-6"
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
          data-hs-tab="#tabs-with-underline-7"
          aria-controls="tabs-with-underline-7"
          role="tab"
          onClick={() => handleTab("prenatal")}
        >
          prenatal
        </button>
      </nav>
    </div>
  );
}

export default ResourceTabs;
