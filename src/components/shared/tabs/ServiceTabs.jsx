import React from "react";

function ServiceTabs() {
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
          Daily Guide
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          data-hs-tab="#tabs-with-underline-2"
          aria-controls="tabs-with-underline-2"
          role="tab"
        >
          Recommended Resources
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-3"
          data-hs-tab="#tabs-with-underline-3"
          aria-controls="tabs-with-underline-3"
          role="tab"
        >
          Add Recommended Resources
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-4"
          data-hs-tab="#tabs-with-underline-4"
          aria-controls="tabs-with-underline-4"
          role="tab"
        >
          Courses
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-5"
          data-hs-tab="#tabs-with-underline-5"
          aria-controls="tabs-with-underline-5"
          role="tab"
        >
          Add Courses
        </button>
        <button
          type="button"
          className="border-b-2 border-transparent hs-tab-active:border-b-primaryColor hs-tab-active:text-primaryColor py-2 px-4 inline-flex items-center"
          id="tabs-with-underline-item-6"
          data-hs-tab="#tabs-with-underline-6"
          aria-controls="tabs-with-underline-6"
          role="tab"
        >
          Wellness
        </button>
      </nav>
    </div>
  );
}

export default ServiceTabs;
