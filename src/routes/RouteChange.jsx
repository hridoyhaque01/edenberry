// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// function RouteChange() {
//   const { isLoading, userData } = useSelector((state) => state.auth);
//   const location = useLocation();
//   const route =
//     userData?.admin?.permissions[0] === "dashboard"
//       ? ""
//       : userData?.admin?.permissions[0];
//   //   if (isLoading) {
//   //     <div>loading...</div>;
//   //   }
//   //   if (userData?.token) {
//   //     return children;
//   //   }
//   return (
//     <Navigate to={`/${route}`} state={{ from: location }} replace></Navigate>
//   );
// }

// export default RouteChange;
