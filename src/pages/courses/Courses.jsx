import React from "react";
import CoursesTabs from "../../components/shared/tabs/CoursesTabs";
import Title from "../../components/shared/titles/Title";
import AddCourses from "./AddCourses";
import AllCourses from "./AllCourses";

function Courses() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <CoursesTabs></CoursesTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <AllCourses></AllCourses>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <AddCourses></AddCourses>
        </div>
      </div>
    </div>
  );
}

export default Courses;
