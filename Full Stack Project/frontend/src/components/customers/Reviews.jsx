import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./../Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_reviews,
  messageClear,
  update_review,
} from "../../store/Reducers/productReducer";
import { get_product_detail } from "../../store/Reducers/CustomerDashboardReducer";

import toast from "react-hot-toast";

function Reviews({ productDetail }) {
  const dispatch = useDispatch();

  const { customerInfo } = useSelector((state) => state.customer);

  const { successMessage, reviews, rating_review, totalReview } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const [ratingSelected, setRatingSelected] = useState("");
  const [reviewWrtie, setReviewWrite] = useState("");

  const showedReviews = reviews.slice(startIndex, endIndex);

  function reviewSubmit(e) {
    e.preventDefault();
    const reviewObejct = {
      name: customerInfo.name,
      review: reviewWrtie,
      rating: ratingSelected,
      productId: productDetail._id,
    };

    dispatch(update_review(reviewObejct));
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        setRatingSelected("");
        setReviewWrite("");
        dispatch(get_reviews(productDetail._id));
        dispatch(get_product_detail(productDetail._id));
      }
    },
    [successMessage, dispatch, productDetail._id]
  );

  useEffect(
    function () {
      if (productDetail._id) {
        dispatch(get_reviews(productDetail._id));
      }
    },
    [productDetail, dispatch]
  );

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-5xl font-semibold">
              {productDetail.rating}
            </span>
            <span className="text-3xl font-semibold text-slate-500">/5</span>
          </div>
          <div className="flex text-3xl ">
            <Rating rating={productDetail.rating}></Rating>
          </div>
        </div>

        <div className="flex gap-3 flex-col py-4">
          {rating_review.map((each, index) => (
            <RatingTemp
              rating={each}
              key={index}
              total={totalReview}
            ></RatingTemp>
          ))}
        </div>
      </div>

      <h2 className="text-slate-600 text-xl font-bold py-5">
        Rating Reivew({reviews.length}){" "}
      </h2>

      <div className="flex flex-col gap-8 pb-10 pt-4">
        {showedReviews.map((each, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-lg">
                <Rating rating={each.rating}></Rating>
              </div>
              <span className="text-slate-600">{each.date}</span>
            </div>
            <span className="text-slate-600 text-md">{each.customerName}</span>
            <p className="text-slate-600 text-sm">{each.review}</p>
          </div>
        ))}

        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            totalItem={reviews.length}
            showPageNmber={3}
          ></Pagination>
        </div>
      </div>

      <div>
        {customerInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRatingSelected(e)}
                initialRating={ratingSelected}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDB00E] text-4xl">
                    <FaStar />
                  </span>
                }
              ></RatingReact>
            </div>
            <form onSubmit={reviewSubmit}>
              <textarea
                required
                name=""
                id=""
                cols="30"
                rows="5"
                value={reviewWrtie}
                onChange={(e) => setReviewWrite(e.target.value)}
                className="border outline-0 p-3 w-full"
              ></textarea>
              <div className="mt-2">
                <button className="py-2 px-5 bg-indigo-400 text-white rounded-sm">
                  Sumbit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="">
            <Link className="text-white bg-red-500 py-2 px-5 rounded-sm">
              Plase Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
