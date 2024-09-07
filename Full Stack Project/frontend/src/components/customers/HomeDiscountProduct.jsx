import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function HomeDiscountProduct() {
  const rating = 3.5;

  const fakeCategory = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];
  return (
    <div className="py-[45px]">
      <div className="w-[85%] flex flex-wrap mx-auto">
        <div className="w-full">
          <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
            <h2>Feature Products</h2>
            <div className="w-[100px] h-[3px] bg-black mt-4"></div>
          </div>
        </div>

        <div className="w-full">
          <div className="text-end flex justify-end  flex-col text-sm text-slate-600 font-bold pb-[15px]">
            <h2>View all</h2>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 gap-6">
          {fakeCategory.map((c, i) => (
            <div
              key={i}
              className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 "
            >
              <div className="relative overflow-hidden">
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                  3%
                </div>
                <img
                  src={`images1/products/${i + 1}.webp`}
                  alt=""
                  className="h-[240px] w-full"
                />

                <ul className="flex transiton-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                  <li
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
              hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <FaRegHeart></FaRegHeart>
                  </li>
                  <li
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
              hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <Link to="/product/testname">
                      <FaEye></FaEye>
                    </Link>
                  </li>
                  <li
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
              hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <RiShoppingCartLine></RiShoppingCartLine>
                  </li>
                </ul>
              </div>

              <div className="py-3 text-slate-600 px-2 bg-[#fcfcfc]">
                <h2 className="font-bold">Product Name PlaceHolder</h2>
                <div className="flex justify-start items-center gap-3">
                  <span className="text-md font-semibold">$333</span>
                  <Rating rating={rating}></Rating>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDiscountProduct;
