import { useState } from "react";
import { useEffect } from "react";

import HomeSearch from "../../components/customers/HomeSearch";
import HomeSalesBanner from "../../components/customers/HomeSalesBanner";
import HomeCategoryBanner from "../../components/customers/HomeCategoryBanner";
import HomeDiscountProduct from "../../components/customers/HomeDiscountProduct";

import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/Reducers/categoryReducer";
import { getProductsAll } from "../../store/Reducers/productReducer";

function Home() {
  // const { role } = useSelector((state) => state.auth);
  // if (role === "seller") return <Navigate to="/seller/dashboard" replace />;
  // else if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  // else return <Navigate to="/login" replace />;

  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);
  const { productsAll } = useSelector((state) => state.product);

  useEffect(
    function () {
      dispatch(getCategory());
      dispatch(getProductsAll());
    },
    [dispatch]
  );

  return (
    <div className="w-full">
      <HomeSalesBanner></HomeSalesBanner>

      <HomeCategoryBanner category={category}></HomeCategoryBanner>

      <HomeDiscountProduct productsAll={productsAll}></HomeDiscountProduct>
    </div>
  );
}

export default Home;
