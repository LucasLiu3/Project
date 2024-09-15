import { Link, NavLink } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { IoIosArrowDown, IoIosPhonePortrait } from "react-icons/io";
import { FaHeart, FaList, FaLock, FaUser, FaUserPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import HomeSearch from "./HomeSearch";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const { category } = useSelector((state) => state.category);
  const { customerInfo } = useSelector((state) => state.customer);
  const { cartTotal } = useSelector((state) => state.cart);

  const path = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { path: "/blog", name: "Blog" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden ">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail></MdEmail>
                </span>
                <span>support@gmail.com</span>
              </li>
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <IoIosPhonePortrait></IoIosPhonePortrait>
                </span>
                <span>04-473 1234</span>
              </li>
            </ul>

            <div className="flex justify-right items-center font-semibold">
              {customerInfo ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{customerInfo.name}</span>
                </Link>
              ) : (
                <div className="flex justify-center items-center gap-5">
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/login"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login </span>
                  </Link>
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/register"
                  >
                    <span>
                      <FaUserPlus />
                    </span>
                    <span>Sign up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-white ">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <Link to="/">
                <img src="/images/logo.png" alt="" />
              </Link>
            </div>

            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center  items-center flex-wrap pl-8 ">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase">
                  {path.map((each, index) => (
                    <NavLink
                      key={index}
                      to={each.path}
                      className={({ isActive }) =>
                        `p-2 block ${
                          isActive ? "text-[#059473]" : "text-[#030811] "
                        } `
                      }
                    >
                      {each.name}
                    </NavLink>
                  ))}
                </ul>

                <div className="flex md-lg:hidden justify-end  items-center gap-5 ">
                  <div className="flex justify-end gap-5">
                    <div className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-[#e2e2e2]">
                      <span className="text-xl text-red-500">
                        <FaHeart />
                      </span>
                      <span className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[8px] ">
                        3
                      </span>
                    </div>
                    <div className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-[#e2e2e2]">
                      <Link to={customerInfo ? "/shopcart" : "/login"}>
                        <span className="text-xl text-red-500">
                          <FaCartShopping />
                        </span>
                      </Link>
                      {cartTotal === 0 ? (
                        ""
                      ) : (
                        <span className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[8px] ">
                          {cartTotal}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HomeSearch category={category}></HomeSearch>
    </div>
  );
}

export default Header;
