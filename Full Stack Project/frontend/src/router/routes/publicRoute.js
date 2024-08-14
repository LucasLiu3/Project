import { lazy } from "react";
import Home from "../../views/Home";

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));

// import AdminLogin from "../../views/auth/AdminLogin";
// import Register from "../../views/auth/Register";
// import Login from "./../../views/auth/Login";

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
];

export default publicRoutes;
