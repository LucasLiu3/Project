import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from "../../components/customers/Rating";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, addToWishList } from "../../store/Reducers/cartReducer";

function ProductCard({ rating, product }) {
  const dispatch = useDispatch();

  const { customerInfo } = useSelector((state) => state.customer);

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

  function add_to_wishList(productId) {
    console.log(productId);
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

  return (
    <div className="border outline-0 group transition-all duration-500 hover:shadow-md hover:-mt-3 ">
      <div className="relative overflow-hidden">
        {product.discount ? (
          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
            -{product.discount}%
          </div>
        ) : (
          ""
        )}
        <img
          src={product.images?.[0] || product.image}
          alt=""
          className="h-[240px] w-full rounded-md"
        />

        <ul className="flex transiton-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
          <li
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                  hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
            onClick={() => add_to_wishList(product._id)}
          >
            <FaRegHeart></FaRegHeart>
          </li>
          <li
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                  hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
          >
            <Link to={`http://localhost:3000/product/${product._id}`}>
              <FaEye></FaEye>
            </Link>
          </li>
          <li
            className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                  hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all"
            onClick={() => add_to_cart(product._id)}
          >
            <RiShoppingCartLine></RiShoppingCartLine>
          </li>
        </ul>
      </div>

      <div className="py-3 text-slate-600 px-2 bg-[#fcfcfc]">
        <h2 className="font-bold">{product.slug}</h2>
        <div className="flex justify-start items-center gap-3">
          {product.discount !== null ? (
            <>
              <span className="line-through text-md font-semibold">
                ${product.price}
              </span>
              <span className=" text-red-500">
                ${product.price - Math.floor((300 * product.discount) / 100)}
              </span>
            </>
          ) : (
            <span className="text-md font-semibold">${product.price}</span>
          )}

          <Rating rating={rating}></Rating>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
