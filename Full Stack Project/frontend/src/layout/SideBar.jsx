import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getNav } from "../navigation";
import { MdOutlineLogout } from "react-icons/md";

function SideBar() {
  const [allNav, setAllNav] = useState([]);

  useEffect(function () {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);

  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/5%)]
          transition-all`}
      >
        <div className="h-70px flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[60px]">
            <img src="/images/logo.png" className="w-full h-full" alt="" />
          </Link>
        </div>

        <div className="px-[16px] ">
          {allNav.map((nav, i) => (
            <NavLink
              key={i}
              to={nav.path}
              className={({ isActive }) =>
                `px-[12px] py-[9px] rounded-lg flex justify-left items-center gap-[12px] 
                 hover:pl-4 transition-all w-full mb-1
               ${
                 isActive
                   ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                   : "text-[#030811] font-bold duration-200"
               } `
              }
            >
              <span>{nav.icon}</span>
              <span> {nav.title}</span>
            </NavLink>
          ))}

          <button
            className="px-[12px] py-[9px] rounded-lg flex justify-left items-center gap-[12px] 
                 hover:pl-4 transition-all w-full mb-1 text-[#030811] font-bold duration-200"
          >
            <span>
              <MdOutlineLogout />
            </span>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
