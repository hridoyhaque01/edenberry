import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Coach from "../pages/coach/Coach";
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/products/Products";
import Users from "../pages/users/Users";
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
        path: "/users",
        element: <Users></Users>,
      },
    ],
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
