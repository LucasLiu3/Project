import Rating from "./Rating";
import RatingTemp from "./RatingTemp";
import Pagination from "./../Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const userInfo = true;

  const [ratingSelected, setRatingSelected] = useState("");
  const [reviewWrtie, setReviewWrite] = useState("");

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-5xl font-semibold">3.3</span>
            <span className="text-3xl font-semibold text-slate-500">/5</span>
          </div>
          <div className="flex text-3xl ">
            <Rating rating={3.5}></Rating>
          </div>
        </div>

        <div className="flex gap-3 flex-col py-4">
          <RatingTemp rating={5}></RatingTemp>
          <RatingTemp rating={4}></RatingTemp>
          <RatingTemp rating={3}></RatingTemp>
          <RatingTemp rating={2}></RatingTemp>
          <RatingTemp rating={1}></RatingTemp>
          <RatingTemp rating={0}></RatingTemp>
        </div>
      </div>

      <h2 className="text-slate-600 text-xl font-bold py-5">
        Rating Reivew(20){" "}
      </h2>

      <div className="flex flex-col gap-8 pb-10 pt-4">
        {[1, 2, 3, 4, 5].map((each, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-lg">
                <Rating rating={4}></Rating>
              </div>
              <span className="text-slate-600">8 Mar 2024</span>
            </div>
            <span className="text-slate-600 text-md">Name Placeholder</span>
            <p className="text-slate-600 text-sm">
              Customer's review placeholder
            </p>
          </div>
        ))}
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

      <div>
        {userInfo ? (
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
            <form>
              <textarea
                required
                name=""
                id=""
                cols="30"
                rows="5"
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
