import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRouter({ children }) {
  const { isLoading, userData } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    <div>loading...</div>;
  }
  if (userData?.token) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}

export default PrivateRouter;
