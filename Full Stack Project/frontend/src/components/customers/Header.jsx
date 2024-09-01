import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaLock, FaUser, FaUserPlus } from "react-icons/fa";

function Header() {
  const user = true;

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
              {!user ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>Customer Name</span>
                </Link>
              ) : (
                <div className="flex justify-center items-center gap-5">
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/customer/login"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login </span>
                  </Link>
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/customer/login"
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
    </div>
  );
}

export default Header;
