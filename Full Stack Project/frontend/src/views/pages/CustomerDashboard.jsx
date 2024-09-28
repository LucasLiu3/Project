import { Link, Outlet } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

function CustomerDashboard() {
  return (
    <div className="bg-slate-200 mt-5 ">
      <div className="h-full mx-auto">
        <div className="py-20 flex mx-auto relative w-[85%] ">
          <div
            className={`rounded-md z-50 md-lg:absolute  w-[270px] ml-4 bg-white`}
          >
            <ul className="py-5 text-slate-600 px-4 ">
              <li className="flex justify-start items-center gap-2 py-2 hover:bg-indigo-300">
                <span className="text-xl">
                  <IoIosHome />
                </span>
                <Link to="/customerDashboard" className="block">
                  Dashboard{" "}
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-3  hover:bg-indigo-300">
                <span className="text-xl">
                  <FaBorderAll />
                </span>
                <Link to="/customerDashboard/myOrders" className="block">
                  My Orders{" "}
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-3  hover:bg-indigo-300">
                <span className="text-xl">
                  <FaHeart />
                </span>
                <Link to="/customerDashboard/wishlist" className="block">
                  Wishlist{" "}
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-3  hover:bg-indigo-300">
                <span className="text-xl">
                  <IoChatbubbleEllipsesSharp />
                </span>
                <Link to="/customerDashboard/chat" className="block">
                  Chat{" "}
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-3  hover:bg-indigo-300">
                <span className="text-xl">
                  <RiLockPasswordLine />
                </span>
                <Link to="/customerDashboard/change-password" className="block">
                  Change Password{" "}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-[calc(100%-270px)]">
            <div className="mx-4">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
