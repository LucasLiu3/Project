import React, { useState } from "react";
import { Range } from "react-range";
import Rating from "../../components/customers/Rating";

import Pagination from "./../../components/Pagination";
import PageTopBackImg from "./../../components/customers/PageTopBackImg";
import ProductCard from "../../components/customers/ProductCard";

function Shop() {
  const fakeCategory = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];

  const [priceRange, setPriceRange] = useState({ values: [50, 1000] });

  const [rating, setRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  return (
    <div>
      <PageTopBackImg>Products Page</PageTopBackImg>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] lg:w-[90%] h-full mx-auto ">
          <div className="w-full flex flex-warp">
            <div className="w-3/12 md-lg:4/12 md:w-full pr-8 ">
              <h2 className="text-2xl font-bold mb-3 text-slate-600">
                Category
              </h2>
              <div className="py-2">
                {fakeCategory.map((each, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-2 py-1"
                  >
                    <input type="checkbox" id={each} />
                    <label
                      htmlFor={each}
                      className="text-slate-600 block cursor-pointer"
                    >
                      {each}
                    </label>
                  </div>
                ))}
              </div>

              <div className="py-5 flex flex-col gap-5">
                <h2 className="text-2xl font-bold mb-3 text-slate-600">
                  Price
                </h2>

                <Range
                  step={5}
                  min={50}
                  max={1000}
                  values={priceRange.values}
                  onChange={(values) => setPriceRange({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                    >
                      {React.Children.map(children, (child, index) =>
                        React.cloneElement(child, { key: index })
                      )}
                    </div>
                  )}
                  renderThumb={({ props }) => {
                    const { key, ...restProps } = props;

                    return (
                      <div
                        className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                        {...restProps}
                      ></div>
                    );
                  }}
                ></Range>
              </div>
              <span className="text-slate-800 font-bold text-lg py-5">
                ${Math.floor(priceRange.values[0])} - $
                {Math.floor(priceRange.values[1])}{" "}
              </span>

              <div className="py-5 flex flex-col gap-4 ">
                <h2 className="text-2xl font-bold mb-3 text-slate-600">
                  Rating
                </h2>
                <div className="flex flex-col gap-3 cursor-pointer text-xl ">
                  <div onClick={() => setRating(5)}>
                    <Rating rating={5} shop={true}></Rating>
                  </div>
                  <div onClick={() => setRating(4)}>
                    <Rating rating={4} shop={true}></Rating>
                  </div>
                  <div onClick={() => setRating(3)}>
                    <Rating rating={3} shop={true}></Rating>
                  </div>
                  <div onClick={() => setRating(2)}>
                    <Rating rating={2} shop={true}></Rating>
                  </div>
                  <div onClick={() => setRating(1)}>
                    <Rating rating={1} shop={true}></Rating>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="font-semibold text-lg text-slate-600">
                    14 Products
                  </h2>
                  <div className="flex justify-center items-center  rounded-md">
                    <select
                      name=""
                      id=""
                      className="w-[200px] h-full p-1 border outline-none text-slate-600 font-semibold"
                    >
                      <option value="">Sort by</option>
                      <option value="">Low to Higher Price</option>
                      <option value="">High to Low Price</option>
                      <option value="">Low to Higher Rating</option>
                      <option value="">Higher to Low Rating</option>
                    </select>
                  </div>
                </div>

                <div className="pb-8">
                  <div className="w-full grid grid-cols-3 gap-3">
                    {fakeCategory.map((c, i) => (
                      <ProductCard rating={4} i={i}></ProductCard>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPage={perPage}
                    totalItem={35}
                    showPageNmber={3}
                  ></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
