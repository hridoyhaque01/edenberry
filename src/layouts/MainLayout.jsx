import { Outlet } from "react-router-dom";
import SideNav from "../components/shared/sidenav/SideNav";
import TopNav from "../components/shared/topnav/TopNav";
const MainLayout = () => {
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
