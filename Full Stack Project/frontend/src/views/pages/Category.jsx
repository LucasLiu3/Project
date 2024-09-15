import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import { Range } from "react-range";
import Rating from "../../components/customers/Rating";

import Pagination from "./../../components/Pagination";
import PageTopBackImg from "./../../components/customers/PageTopBackImg";
import ProductCard from "../../components/customers/ProductCard";

import { getProductsAll } from "../../store/Reducers/productReducer";

import { messageClear } from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";

function Category() {
  const dispatch = useDispatch();

  const {
    cart,
    successMessage: addcartsuccess,
    errorMessage: addcarterror,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (addcartsuccess) {
      toast.success(addcartsuccess);
      dispatch(messageClear());
    }
    if (addcarterror) {
      toast.error(addcarterror);
      dispatch(messageClear());
    }
  }, [addcartsuccess, addcarterror, dispatch]);

  const [searchParams, SetSearchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");

  useEffect(
    function () {
      dispatch(getProductsAll());
    },
    [dispatch, categoryParams]
  );

  let { productsAll } = useSelector((state) => state.product);

  productsAll = productsAll.filter((each) => each.category === categoryParams);

  const lowestPrice =
    productsAll.length === 0
      ? 0
      : Math.floor(Math.min(...productsAll.map((each) => each.price)) / 5) * 5;
  const HighestPrice =
    productsAll.length === 0
      ? 2000
      : Math.ceil(Math.max(...productsAll.map((each) => each.price)) / 5) * 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const [priceRange, setPriceRange] = useState({
    values: [lowestPrice, HighestPrice],
  });

  useEffect(
    function () {
      dispatch(getProductsAll());
      setPriceRange({ values: [lowestPrice, HighestPrice] });
    },

    [dispatch, categoryParams, lowestPrice, HighestPrice]
  );

  const [ratingSelected, setRatingSelected] = useState("");

  const [sortFilter, setSortFilter] = useState("");

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  if (priceRange)
    productsAll = productsAll.filter(
      (each) =>
        each.price >= priceRange.values[0] && each.price <= priceRange.values[1]
    );
  if (ratingSelected === 0) {
    productsAll = productsAll.filter((each) => each.rating === ratingSelected);
  }
  if (ratingSelected > 0) {
    productsAll = productsAll.filter(
      (each) =>
        each.rating >= ratingSelected && each.rating < ratingSelected + 1
    );
  }

  if (sortFilter) {
    if (sortFilter === "low-high-price")
      productsAll = productsAll.sort((a, b) => a.price - b.price);
    else if (sortFilter === "high-low-price")
      productsAll = productsAll.sort((a, b) => b.price - a.price);
    else if (sortFilter === "low-high-rating")
      productsAll = productsAll.sort((a, b) => a.rating - b.rating);
    else if (sortFilter === "high-low-rating")
      productsAll = productsAll.sort((a, b) => b.rating - a.rating);
  }

  let productsAllShow = productsAll.slice(startIndex, endIndex);

  function clearFilter() {
    setPriceRange({ values: [lowestPrice, HighestPrice] });
    setRatingSelected("");
  }

  return (
    <div>
      <PageTopBackImg>Category Page ({categoryParams})</PageTopBackImg>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] lg:w-[90%] h-full mx-auto ">
          <div className="w-full flex flex-warp">
            <div className="w-3/12 md-lg:4/12 pr-8 ">
              <div className="py-5 flex flex-col gap-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold  text-slate-600">Price</h2>
                  <button
                    className="bg-[#059473] p-1 rounded-lg text-white"
                    onClick={clearFilter}
                  >
                    Reset
                  </button>
                </div>

                <Range
                  step={5}
                  min={lowestPrice}
                  max={HighestPrice}
                  values={priceRange.values}
                  onChange={(values) => {
                    setPriceRange({ values });
                    setCurrentPage(1);
                  }}
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
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 5 ? "" : 5)
                    }
                  >
                    <Rating rating={5} shop={true}></Rating>
                  </div>
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 4 ? "" : 4)
                    }
                  >
                    <Rating rating={4} shop={true}></Rating>
                  </div>
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 3 ? "" : 3)
                    }
                  >
                    <Rating rating={3} shop={true}></Rating>
                  </div>
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 2 ? "" : 2)
                    }
                  >
                    <Rating rating={2} shop={true}></Rating>
                  </div>
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 1 ? "" : 1)
                    }
                  >
                    <Rating rating={1} shop={true}></Rating>
                  </div>
                  <div
                    onClick={() =>
                      setRatingSelected(ratingSelected === 0 ? "" : 0)
                    }
                  >
                    <Rating rating={0} shop={true}></Rating>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="font-semibold text-lg text-slate-600">
                    {productsAll.length} Products
                  </h2>
                  <div className="flex justify-center items-center  rounded-md">
                    <select
                      name=""
                      id=""
                      className="w-[220px] h-full p-1 border outline-none text-slate-600 font-semibold"
                      onChange={(e) => setSortFilter(e.target.value)}
                    >
                      <option value="">Sort by</option>
                      <option value="low-high-price">
                        Low to Higher Price
                      </option>
                      <option value="high-low-price">High to Low Price</option>
                      <option value="low-high-rating">
                        Low to Higher Rating
                      </option>
                      <option value="high-low-rating">
                        Higher to Low Rating
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pb-8">
                  <div className="w-full grid grid-cols-3 gap-3">
                    {productsAllShow.map((c, i) => (
                      <ProductCard
                        rating={c.rating}
                        key={i}
                        product={c}
                      ></ProductCard>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    perPage={perPage}
                    totalItem={productsAll.length}
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

export default Category;
