import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HomeSearch({ category }) {
  const navigate = useNavigate();

  const [showCategory, setShowCategory] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCateogry] = useState("");

  function search() {
    navigate(
      `/products/search?productName=${searchValue}&category=${selectedCategory}`
    );
    setSearchValue("");
    setSelectedCateogry("");
  }

  return (
    <div className="w-full">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-warp md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setShowCategory(!showCategory)}
                className="h-[50px] bg-[#059473] text-white flex justify-center md-ld:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer rounded-md"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList></FaList>
                  </span>
                  <span>All Category</span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </div>

              <div
                className={`${
                  showCategory ? "h-0" : "h-[400px]"
                } overflow-hidden translate-all md-lg:relative duration-500 absolute z-[99999] bg-[#dbf3ed] w-full border-x round-sm `}
              >
                <ul className="py-2 text-slate-600 font-semibold">
                  {category.map((each, index) => (
                    <Link
                      key={index}
                      className=" flex justify-start items-center gap-2 px-[24px] py-[6px] hover:bg-blue-400"
                      onClick={() => setShowCategory(true)}
                      to={`/products?category=${each.slug}`}
                    >
                      {each.slug}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full ">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6 ">
              <div className="w-8/12 md-lg:w-full  ">
                <div className="flex border h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md-lg:hidden">
                    <select
                      name=""
                      id=""
                      value={selectedCategory}
                      className="w-[200px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                      onChange={(e) => setSelectedCateogry(e.target.value)}
                    >
                      <option value="">Category</option>
                      {category.map((each, index) => (
                        <option value={each.slug} key={index}>
                          {each.slug}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-grow relative flex items-center">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Product Name"
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                      className="w-full relative bg-transparent text-slate-700 outline-0 px-3 h-full"
                    />
                    <button
                      className="bg-[#059473] right-0 absolute px-8 h-[50px] font-semibold uppercase text-white"
                      onClick={search}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
