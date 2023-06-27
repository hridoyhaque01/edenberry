import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../../../features/services/servicesSlice";

function ServiceTabs() {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.services);

  console.log(activeTab);

  const handleTab = (tabValue) => {
    dispatch(changeTab(tabValue));
  };

  return (
    <div className="bg-fade text-fadeHigh ">
      <nav
        className="flex space-x-2 text-base leading-5 whitespace-nowrap font-semibold"
        aria-label="Tabs"
        role="tablist"
      >
        <button
          type="button"
          className={`border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center ${
            activeTab === "guide" ? "active" : ""
          }`}
          id="tabs-with-underline-item-1"
          data-hs-tab="#tabs-with-underline-1"
          aria-controls="tabs-with-underline-1"
          role="tab"
          onClick={() => handleTab("guide")}
        >
          Daily Guide
        </button>
        <button
          type="button"
          className={`border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center ${
            activeTab === "resources" ? "active" : ""
          }`}
          data-hs-tab="#tabs-with-underline-2"
          aria-controls="tabs-with-underline-2"
          role="tab"
          onClick={() => handleTab("resources")}
        >
          Recommended Resources
        </button>
        {/* <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-3"
          data-hs-tab="#tabs-with-underline-3"
          aria-controls="tabs-with-underline-3"
          role="tab"
        >
          Add Recommended Resources
        </button> */}
        <button
          type="button"
          className={`border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center ${
            activeTab === "courses" ? "active" : ""
          }`}
          id="tabs-with-underline-item-4"
          data-hs-tab="#tabs-with-underline-4"
          aria-controls="tabs-with-underline-4"
          role="tab"
          onClick={() => handleTab("courses")}
        >
          Courses
        </button>
        {/* <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-5"
          data-hs-tab="#tabs-with-underline-5"
          aria-controls="tabs-with-underline-5"
          role="tab"
        >
          Add Courses
        </button> */}
        <button
          type="button"
          className={`border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center ${
            activeTab === "wellness" ? "active" : ""
          }`}
          id="tabs-with-underline-item-6"
          data-hs-tab="#tabs-with-underline-6"
          aria-controls="tabs-with-underline-6"
          role="tab"
          onClick={() => handleTab("wellness")}
        >
          Wellness
        </button>
      </nav>
    </div>
  );
}

export default ServiceTabs;
