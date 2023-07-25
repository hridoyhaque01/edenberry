import React from "react";
import { useSelector } from "react-redux";
import ServiceTabs from "../../components/shared/tabs/ServiceTabs";
import Courses from "./Courses";
import DailyGuide from "./DailyGuide";
import Resources from "./Resources";
import Wellness from "./Wellness";

function Services() {
  const { activeTab } = useSelector((state) => state.services);

  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <ServiceTabs></ServiceTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "guide" ? "" : "hidden"}`}
        >
          <DailyGuide></DailyGuide>
        </div>
        <div
          id="tabs-with-underline-2"
          className={`${activeTab === "resources" ? "" : "hidden"}`}
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <Resources></Resources>
        </div>
        {/* <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <AddRecomendedResource></AddRecomendedResource>
        </div> */}
        <div
          id="tabs-with-underline-4"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-4"
          className={`${activeTab === "courses" ? "" : "hidden"}`}
        >
          <Courses></Courses>
        </div>
        {/* <div
          id="tabs-with-underline-5"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-5"
        >
          <AddCourse></AddCourse>
        </div> */}
        <div
          id="tabs-with-underline-6"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-6"
          className={`${activeTab === "wellness" ? "" : "hidden"}`}
        >
          <Wellness></Wellness>
        </div>
      </div>
    </div>
  );
}

export default Services;
