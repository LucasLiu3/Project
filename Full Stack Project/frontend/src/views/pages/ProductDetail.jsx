import { Link } from "react-router-dom";
import { useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PageTopBackImg from "../../components/customers/PageTopBackImg";
import Rating from "./../../components/customers/Rating";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Reviews from "../../components/customers/Reviews";

function ProductDetail() {
  const fakeCategory = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  const [selectedImg, setSelectedImg] = useState(1);

  const discount = 20;
  const stock = 2;

  const [side, setSide] = useState(true);

  return (
    <div>
      <PageTopBackImg>Product Details Page</PageTopBackImg>

      <section>
        <div className="bg-slate-100 py-5 mb-5">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full gap-2">
              <Link to="/">Home</Link>
              <span>
                <MdKeyboardArrowRight />
              </span>
              <Link>Category</Link>
              <span>
                <MdKeyboardArrowRight />
              </span>
              <span>Product Name Holder</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[400px] w-full"
                  src={`/images1/products/${selectedImg}.webp`}
                  alt=""
                />
              </div>
              <div className="py-3">
                {fakeCategory && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {fakeCategory.map((img, i) => {
                      return (
                        <div onClick={() => setSelectedImg(i + 1)} key={i}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={`/images1/products/${i + 1}.webp`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5 ">
              <div className="text-3xl text-slate-600 font-bold">
                <h3>Product Name Holder</h3>
              </div>
              <div className="flex justify-start items-center gap-5">
                <Rating rating={4}></Rating>
                {stock > 0 ? (
                  <span className="text-green-500 text-lg">
                    {stock > 1
                      ? `${stock} items in stock`
                      : `${stock} item in stock`}
                  </span>
                ) : (
                  <span className="text-red-500 text-lg">Out of Stock</span>
                )}
              </div>
              <div className="text-xl font-bold flex gap-3">
                {discount !== 0 ? (
                  <>
                    <span className="line-through">$300</span>
                    <span className=" text-red-500">
                      ${300 - Math.floor((300 * discount) / 100)}
                    </span>
                    <span className=" text-red-500">(-{discount}%)</span>
                  </>
                ) : (
                  <span>Orginal Price</span>
                )}
              </div>

              <div className="text-slate-600 ">
                <p>
                  Crafted from high-quality, BPA-free stainless steel, this
                  bottle is designed to keep your drinks cold for up to 24 hours
                  and hot for up to 12 hours. Its sleek, durable design makes it
                  ideal for outdoor adventures, gym workouts, or office use. The
                  leak-proof, easy-to-carry cap ensures no spills, while the
                  wide mouth allows for easy filling and cleaning. Available in
                  a variety of stylish colors, the EcoLite Water Bottle combines
                  practicality with eco-friendly materials, helping you stay
                  hydrated while reducing plastic waste.
                </p>
              </div>

              <div className="flex gap-3 pb-10 borard-b">
                {stock > 1 ? (
                  <>
                    <div className="flex bg-slate-200 h-[40px] justify-center items-center text-xl">
                      <div className="px-6 cursor-pointer">-</div>
                      <div className="px-6 cursor-pointer">2</div>
                      <div className="px-6 cursor-pointer">+</div>
                    </div>

                    <div className="px-4 py-2 h-[40px] cursor-pointer bg-[#059473] text-white">
                      <button>Add to Cart</button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  {" "}
                  <div className="h-[40] w-[40px] flex justify-center items-center cursor-pointer hover:shadow-md bg-red-500 py-3 px-2 text-white">
                    <FaHeart></FaHeart>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white">
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to="#"
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap ">
            <div className="w-full ">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2 py-5 ">
                  <button
                    className={`${
                      side ? "bg-[#059473]" : "bg-slate-200"
                    } py-2 rounded-md`}
                    onClick={() => setSide(true)}
                  >
                    Rating
                  </button>
                  <button
                    className={`${
                      side ? "bg-slate-200" : "bg-[#059473]"
                    } py-2 rounded-md`}
                    onClick={() => setSide(false)}
                  >
                    Description
                  </button>
                </div>

                <div>
                  {side ? (
                    <Reviews></Reviews>
                  ) : (
                    <p className="py-5 text-slate-500">
                      {" "}
                      Crafted from high-quality, BPA-free stainless steel, this
                      bottle is designed to keep your drinks cold for up to 24
                      hours and hot for up to 12 hours. Its sleek, durable
                      design makes it ideal for outdoor adventures, gym
                      workouts, or office use. The leak-proof, easy-to-carry cap
                      ensures no spills, while the wide mouth allows for easy
                      filling and cleaning. Available in a variety of stylish
                      colors, the EcoLite Water Bottle combines practicality
                      with eco-friendly materials, helping you stay hydrated
                      while reducing plastic waste.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
