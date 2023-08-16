import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideNav from "../components/shared/sidenav/SideNav";
import TopNav from "../components/shared/topnav/TopNav";
import { fetchAdmin } from "../features/admin/adminSlice";
import { fetchChart } from "../features/chart/ChartSlice";
import {
  fetchApprovedCoaches,
  fetchCoaches,
} from "../features/coach/coachSlice";
import { fetchMidWives } from "../features/midwives/midWiveSlice";
import { fetchPrivacy } from "../features/privacy/privacySlice";
import { fetchProducts } from "../features/products/productSlice";
import { fetchSeekHelps } from "../features/seekHelps/seekHelpsSlice";
import { fetchCourses } from "../features/services/courseSlice";
import { fetchExercise } from "../features/services/exerciseSlice";
import { fetchGuides } from "../features/services/guidesSlice";
import { fetchResources } from "../features/services/resourceSlice";
import { fetchWellness } from "../features/services/wellnessSlice";
import { fetchUsers } from "../features/users/usersSlice";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCoaches());
    dispatch(fetchCourses());
    dispatch(fetchGuides());
    dispatch(fetchResources());
    dispatch(fetchMidWives());
    dispatch(fetchAdmin(userData?.token));
    dispatch(fetchUsers());
    dispatch(fetchWellness());
    dispatch(fetchSeekHelps());
    dispatch(fetchPrivacy());
    dispatch(fetchProducts());
    dispatch(fetchChart());
    dispatch(fetchApprovedCoaches());
    dispatch(fetchExercise());
  }, [dispatch]);

  const permissons = useMemo(() => userData?.admin?.permissions, []);

  useEffect(() => {
    const path = localStorage.getItem("location");
    if (path) {
      navigate(`/${path}`);
    } else if (permissons?.length > 0) {
      navigate(`/${permissons[0]}`);
    }
  }, [navigate, permissons]);

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (permissons?.includes(path)) {
      localStorage.setItem("location", path);
    } else if (permissons?.length > 0 && path === "") {
      navigate(`/${permissons[0]}`);
      // localStorage.setItem("location", permissons[0]);
    }
  }, [location.pathname, permissons, navigate]);

  return (
    <div className="bg-white h-screen w-full overflow-hidden">
      <TopNav></TopNav>
      <div className="flex gap-6 h-screen">
        <SideNav></SideNav>
        <div className="w-full pr-10 h-[calc(100%-90px)] relative overflow-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
