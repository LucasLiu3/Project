import { lazy } from "react";

import FrontLayout from "../../components/customers/FrontLayout";
import ShopCart from "../../views/pages/ShopCart";
import Shipping from "../../views/pages/Shipping";
import ProductDetail from "../../views/pages/ProductDetail";
const Home = lazy(() => import("../../views/pages/Home"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
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
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
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
];

const publicRoutes = () => {
  return {
    element: <FrontLayout></FrontLayout>,
    children: publicRoutesList,
  };
};

export default publicRoutes;
