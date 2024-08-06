import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

function MainLayout() {
  return (
    <div className="bg-[#cdcae9] w-full min-h-screen">
      <Header></Header>
      <SideBar></SideBar>
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default MainLayout;
