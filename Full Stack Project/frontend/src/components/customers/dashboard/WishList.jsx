import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishList,
  messageClear,
  addToCart,
  removeWishList,
} from "../../../store/Reducers/cartReducer";

import toast from "react-hot-toast";

const WishList = () => {
  const dispatch = useDispatch();

  const { customerInfo } = useSelector((state) => state.customer);
  const { wishList, errorMessage, successMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(
    function () {
      dispatch(getWishList(customerInfo.id));
    },
    [customerInfo, dispatch]
  );

  function add_to_cart(productId) {
    if (customerInfo) {
      dispatch(
        addToCart({
          customerId: customerInfo.id,
          quantity: 1,
          productId: productId,
        })
      );
    } else {
      toast.error("Plase Log in first");
    }
  }

  function remove_wishList(wishListId) {
    if (customerInfo) {
      dispatch(removeWishList(wishListId));
    } else {
      toast.error("Plase Log in first");
    }
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(getWishList(customerInfo.id));
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, customerInfo]);

  return (
    <div className="w-full grid grid-cols-4 gap-6 bg-white p-2">
      {wishList.map((product, i) => (
        <div
          key={i}
          className="border outline-0 group transition-all duration-500 hover:shadow-md hover:-mt-3"
        >
          <div className="relative overflow-hidden">
            {product.discount ? (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                -{product.discount}%
              </div>
            ) : (
              ""
            )}
            <img
              src={product.image}
              alt=""
              className="h-[240px] w-full rounded-md"
            />

            <ul className="flex transiton-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                   hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                onClick={() => remove_wishList(product._id)}
              >
                <FaRegHeart></FaRegHeart>
              </li>
              <li
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                   hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
              >
                <Link to={`http://localhost:3000/product/${product.productId}`}>
                  <FaEye></FaEye>
                </Link>
              </li>
              <li
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                   hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
                onClick={() => add_to_cart(product.productId)}
              >
                <RiShoppingCartLine></RiShoppingCartLine>
              </li>
            </ul>
          </div>

          <div className="py-3 text-slate-600 px-2 bg-[#fcfcfc]">
            <h2 className="font-bold">{product.name}</h2>
            <div className="flex justify-start items-center gap-3">
              {product.discount !== null ? (
                <>
                  <span className="line-through text-md font-semibold">
                    ${product.price}
                  </span>
                  <span className=" text-red-500">
                    $
                    {product.price - Math.floor((300 * product.discount) / 100)}
                  </span>
                </>
              ) : (
                <span className="text-md font-semibold">${product.price}</span>
              )}

              <Rating rating={product.rating}></Rating>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WishList;
