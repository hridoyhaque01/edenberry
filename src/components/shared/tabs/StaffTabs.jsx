import React from "react";

function StaffTabs() {
  return (
    <div className="bg-fade text-fadeHigh ">
      <nav
        className="flex space-x-2 text-base leading-5 whitespace-nowrap font-semibold"
        aria-label="Tabs"
        role="tablist"
      >
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center active"
          id="tabs-with-underline-item-1"
          data-hs-tab="#tabs-with-underline-1"
          aria-controls="tabs-with-underline-1"
          role="tab"
        >
          Staffs
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          data-hs-tab="#tabs-with-underline-2"
          aria-controls="tabs-with-underline-2"
          role="tab"
        >
          Add Staff
        </button>
      </nav>
    </div>
  );
}

export default StaffTabs;
