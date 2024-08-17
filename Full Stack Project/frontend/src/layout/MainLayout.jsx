import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import SideBar from "./SideBar";

function MainLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[##f9fafb] w-full min-h-screen">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></Header>
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></SideBar>
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all ">
        <div className="px-2 md:px-7 py-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
