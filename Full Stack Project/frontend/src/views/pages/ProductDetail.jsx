import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PageTopBackImg from "../../components/customers/PageTopBackImg";
import Rating from "./../../components/customers/Rating";

import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Reviews from "../../components/customers/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { get_product_detail } from "../../store/Reducers/CustomerDashboardReducer";
import toast from "react-hot-toast";

import {
  addToCart,
  addToWishList,
  messageClear,
} from "../../store/Reducers/cartReducer";

function ProductDetail() {
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

  const [selectedImg, setSelectedImg] = useState("");

  const [side, setSide] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const { productDetail } = useSelector((state) => state.customerDashboard);

  const [quantity, setQuantity] = useState(1);

  const { successMessage, errorMessage } = useSelector((state) => state.cart);
  const { customerInfo } = useSelector((state) => state.customer);

  useEffect(
    function () {
      dispatch(get_product_detail(productId));
    },
    [productId, dispatch]
  );

  function addQuantity() {
    if (quantity >= productDetail.stock) return toast.error("Out of Stock");

    setQuantity((quantity) => quantity + 1);
  }

  function minusQuantity() {
    if (quantity === 1) return toast.error("Quantity can not be 0");

    setQuantity((quantity) => quantity - 1);
  }

  function add_to_cart(productId) {
    if (customerInfo) {
      dispatch(
        addToCart({
          customerId: customerInfo.id,
          quantity: quantity,
          productId: productId,
        })
      );
    } else {
      toast.error("Plase Log in first");
    }
  }

  function add_to_wishList(productId) {
    if (customerInfo) {
      dispatch(
        addToWishList({
          customerId: customerInfo.id,
          productId: productId,
        })
      );
    } else {
      toast.error("Plase Log in first");
    }
  }

  const buyNowProduct = [
    [
      productDetail.shopName,
      [
        {
          productsInCart: [{ ...productDetail, quantity: quantity }],
          quantity: quantity,
        },
      ],
    ],
  ];

  function buyNow() {
    navigate("/shipping", {
      state: {
        products: buyNowProduct,
        price:
          productDetail.price * (1 - productDetail.discount / 100) * quantity,
        shippingFee: buyNowProduct.length * 20,
        items: quantity,
      },
    });
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, customerInfo]);

  if (!productDetail) return <p>Loading....</p>;

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
              <Link
                to={`http://localhost:3000/products?category=${productDetail.category}`}
              >
                {productDetail.category}
              </Link>
              <span>
                <MdKeyboardArrowRight />
              </span>
              <span>{productDetail.slug}</span>
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
                  className="h-[400px] w-full object-contain"
                  src={selectedImg || productDetail.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3">
                {productDetail.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {productDetail.images?.map((img, i) => {
                      return (
                        <div onClick={() => setSelectedImg(img)} key={i}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={img}
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
                <h3>{productDetail.product}</h3>
              </div>
              <div className="flex justify-start items-center gap-5">
                <Rating rating={productDetail.rating}></Rating>
                {productDetail.stock > 0 ? (
                  <span className="text-green-500 text-lg">
                    {productDetail.stock > 1
                      ? `${productDetail.stock} items in stock`
                      : `${productDetail.stock} item in stock`}
                  </span>
                ) : (
                  <span className="text-red-500 text-lg">Out of Stock</span>
                )}
              </div>
              <div className="text-xl font-bold flex gap-3">
                {productDetail.discount !== 0 ? (
                  <>
                    <span className="text-xl">Price:</span>
                    <span className="line-through">${productDetail.price}</span>
                    <span className=" text-red-500">
                      $
                      {(
                        productDetail.price *
                        (1 - productDetail.discount / 100)
                      ).toFixed(2)}
                    </span>
                    <span className=" text-red-500">
                      (-{productDetail.discount}%)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">Price:</span>
                    <span>${productDetail.price}</span>
                  </>
                )}
              </div>

              <p>{productDetail.description}</p>
              <div className="text-slate-600 text-lg flex flex-col gap-3 font-semibold">
                <p>Category: {productDetail.category}</p>
                <p>Brand: {productDetail.brand}</p>
                <p>Shop Name: {productDetail.shopName}</p>
              </div>

              <div className="flex gap-3 pb-10 borard-b">
                {productDetail.stock >= 1 ? (
                  <>
                    <div className="flex bg-slate-200 h-[40px] justify-center items-center text-xl">
                      <div
                        className="px-6 cursor-pointer"
                        onClick={minusQuantity}
                      >
                        -
                      </div>
                      <div className="px-6 cursor-pointer">{quantity}</div>
                      <div
                        className="px-6 cursor-pointer"
                        onClick={addQuantity}
                      >
                        +
                      </div>
                    </div>

                    <div
                      onClick={() => add_to_cart(productDetail._id)}
                      className="px-4 py-2 h-[40px] cursor-pointer bg-[#059473] text-white"
                    >
                      <button>Add to Cart</button>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div>
                  {" "}
                  <div
                    onClick={() => add_to_wishList(productDetail._id)}
                    className="h-[40] w-[40px] flex justify-center items-center cursor-pointer hover:shadow-md bg-red-500 py-3 px-2 text-white"
                  >
                    <FaHeart></FaHeart>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {productDetail.stock >= 1 ? (
                  <button
                    onClick={buyNow}
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                  >
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to={`/customerDashboard/chat/${productDetail.sellerId}`}
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
                    <Reviews productDetail={productDetail}></Reviews>
                  ) : (
                    <p className="py-5 text-slate-500">
                      {productDetail.description}
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
