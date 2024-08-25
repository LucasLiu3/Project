import { lazy } from "react";
import Home from "../../views/Home";

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));

const publicRoutes = [
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
];

export default publicRoutes;
