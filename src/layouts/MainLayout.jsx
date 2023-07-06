import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideNav from "../components/shared/sidenav/SideNav";
import TopNav from "../components/shared/topnav/TopNav";
import { fetchAdmin } from "../features/admin/adminSlice";
import { fetchCoaches } from "../features/coach/coachSlice";
import { fetchMidWives } from "../features/midwives/midWiveSlice";
import { fetchCourses } from "../features/services/courseSlice";
import { fetchGuides } from "../features/services/guidesSlice";
import { fetchResources } from "../features/services/resourceSlice";
import { fetchWellness } from "../features/services/wellnessSlice";
import { fetchUsers } from "../features/users/usersSlice";
const MainLayout = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCoaches());
    dispatch(fetchCourses());
    dispatch(fetchGuides());
    dispatch(fetchResources());
    dispatch(fetchMidWives());
    dispatch(fetchAdmin(userData?.token));
    dispatch(fetchUsers());
    dispatch(fetchWellness());
  }, [dispatch]);

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
