import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

import { messageClear } from "../../store/Reducers/cartReducer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function HomeDiscountProduct({ productsAll }) {
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

  const productsBanner = productsAll.slice(0, 6);

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
          <div className="text-end flex justify-end  flex-col text-sm text-slate-600 font-bold pb-[15px] hover:text-slate-950">
            <Link to="/shop">
              <h2 className="text-md">View all</h2>{" "}
            </Link>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 gap-6">
          {productsBanner.map((c, i) => (
            <ProductCard
              rating={c.rating}
              key={i}
              i={i}
              product={c}
            ></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDiscountProduct;
