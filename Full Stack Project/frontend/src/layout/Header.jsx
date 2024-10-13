import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header({ showSidebar, setShowSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div
        className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between
      items-center bg-slate-100 px-5 transition-all"
      >
        <div
          onClick={() => setShowSidebar((show) => !show)}
          className={`w-[35px] h-[35px] flex lg:hidden rounded-sm bg-blue-50 shadow-lg
            hover:shadow-indigo-500/50 justify-center items-center cursor-pointer`}
        >
          <span>
            <FaList />
          </span>
        </div>

        <div className="hidden md:block">
          <input
            type="text"
            name="search"
            placeholder="search..."
            className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] 
            border bg-transparent border-slate-700 text-slate-700 focus:border-indigo-700 
            overflow-hidden outline-none placeholder-bold "
          />
        </div>
        <div className="flex justify-center items-center gap-3 relative">
          <div className="flex justify-center items-center flex-col text-end ">
            <span className="text-md font-bold">{userInfo.name}</span>
            <span className="text-[14px] w-full font-normal">
              {userInfo.role}
            </span>
          </div>
          <img
            src={
              userInfo.image === "admin.png"
                ? "/images/admin.png"
                : userInfo.image ||
                  "http://localhost:3000/images/image/register.jpg"
            }
            alt=""
            className="w-[40px] h-[40px] rounded-full overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
