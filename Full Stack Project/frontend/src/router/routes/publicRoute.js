import { lazy } from "react";

import FrontLayout from "../../components/customers/FrontLayout";
import ShopCart from "../../views/pages/ShopCart";
import Shipping from "../../views/pages/Shipping";
import ProductDetail from "../../views/pages/ProductDetail";
import CustomerLogin from "../../views/pages/CustomerLogin";
import CustomerRegister from "../../views/pages/CustomerRegister";
import Category from "../../views/pages/Category";
import ProductSearch from "../../views/pages/ProductSearch";
const Home = lazy(() => import("../../views/pages/Home"));
const SellerLogin = lazy(() => import("../../views/auth/SellerLogin"));
const SellerRegister = lazy(() => import("../../views/auth/SellerRegister"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));
const Shop = lazy(() => import("../../views/pages/Shop"));

const publicRoutesList = [
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <CustomerLogin></CustomerLogin>,
  },
  {
    path: "/register",
    element: <CustomerRegister></CustomerRegister>,
  },
  {
    path: "/seller/login",
    element: <SellerLogin></SellerLogin>,
  },
  {
    path: "/seller/register",
    element: <SellerRegister></SellerRegister>,
  },
  {
    path: "/admin/login",
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: "/unAuthorized",
    element: <UnAuthorized></UnAuthorized>,
  },
  {
    path: "/shop",
    element: <Shop></Shop>,
  },
  {
    path: "/shopcart",
    element: <ShopCart></ShopCart>,
  },
  {
    path: "/shipping",
    element: <Shipping></Shipping>,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail></ProductDetail>,
  },
  {
    path: "/products?",
    element: <Category></Category>,
  },
  {
    path: "/products/search?",
    element: <ProductSearch></ProductSearch>,
  },
];

const publicRoutes = () => {
  return {
    element: <FrontLayout></FrontLayout>,
    children: publicRoutesList,
  };
};

export default publicRoutes;
