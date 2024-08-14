import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import SideBar from "./SideBar";

function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#cdcae9] w-full min-h-screen">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></Header>
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></SideBar>
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default MainLayout;