import React from "react";
import ServiceTabs from "../../components/shared/tabs/ServiceTabs";
import Title from "../../components/shared/titles/Title";
import AddCourse from "./AddCourse";
import AddRecomendedResource from "./AddRecomendedResource";
import Wellness from "./Wellness";

function Services() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <ServiceTabs></ServiceTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          Daily Guide
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          Recommended Resources
        </div>
        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <AddRecomendedResource></AddRecomendedResource>
        </div>
        <div
          id="tabs-with-underline-4"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-4"
        >
          Courses
        </div>
        <div
          id="tabs-with-underline-5"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-5"
        >
          <AddCourse></AddCourse>
        </div>
        <div
          id="tabs-with-underline-6"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-6"
        >
          <Wellness></Wellness>
        </div>
      </div>
    </div>
  );
}

export default Services;
