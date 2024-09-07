import { useState } from "react";

import HomeSearch from "../../components/customers/HomeSearch";
import HomeSalesBanner from "../../components/customers/HomeSalesBanner";
import HomeCategoryBanner from "../../components/customers/HomeCategoryBanner";
import HomeDiscountProduct from "../../components/customers/HomeDiscountProduct";

function Home() {
  // const { role } = useSelector((state) => state.auth);
  // if (role === "seller") return <Navigate to="/seller/dashboard" replace />;
  // else if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  // else return <Navigate to="/login" replace />;

  const [showCategory, setShowCategory] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCateogry] = useState("");

  const fakeCategory = [
    "Category1",
    "Category2",
    "Category3",
    "Category4",
    "Category5",
    "Category6",
  ];

  const rating = 0.1;

  return (
    <div className="w-full">
      <HomeSearch></HomeSearch>

      <HomeSalesBanner></HomeSalesBanner>

      <HomeCategoryBanner></HomeCategoryBanner>

      <HomeDiscountProduct></HomeDiscountProduct>
    </div>
  );
}

export default Home;
