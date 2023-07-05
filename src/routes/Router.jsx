import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Additional from "../pages/additional/Additional";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import Coach from "../pages/coach/Coach";
import Courses from "../pages/courses/Courses";
import Dashboard from "../pages/dashboard/Dashboard";
import CourseForm from "../pages/formPages/CourseForm";
import GuideForm from "../pages/formPages/GuideForm";
import ResourceForm from "../pages/formPages/ResourceForm";
import WellnessForm from "../pages/formPages/WellnessForm";
import Products from "../pages/products/Products";
import Request from "../pages/request/Request";
import Services from "../pages/services/Services";
import Staffs from "../pages/staffs/Staffs";
import PrivateRouter from "./PrivateRouter";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <MainLayout></MainLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/coach",
        element: <Coach></Coach>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/courses",
        element: <Courses></Courses>,
      },
      {
        path: "/staffs",
        element: <Staffs></Staffs>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/addwellness",
        element: <WellnessForm></WellnessForm>,
      },
      {
        path: "/editwellness",
        element: <WellnessForm></WellnessForm>,
      },
      {
        path: "/addCourse",
        element: <CourseForm></CourseForm>,
      },
      {
        path: "/editCourse",
        element: <CourseForm></CourseForm>,
      },
      {
        path: "/addResource",
        element: <ResourceForm></ResourceForm>,
      },
      {
        path: "/editResource",
        element: <ResourceForm></ResourceForm>,
      },
      {
        path: "/addGuide",
        element: <GuideForm></GuideForm>,
      },
      {
        path: "/editGuide",
        element: <GuideForm></GuideForm>,
      },
      {
        path: "/request",
        element: <Request></Request>,
      },
      {
        path: "/additional",
        element: <Additional></Additional>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: (
      <h2 className="font-black py-6 text-3xl text-red-600 text-center">
        Page Not Found!
      </h2>
    ),
  },
]);
