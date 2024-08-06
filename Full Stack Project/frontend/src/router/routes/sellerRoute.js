import { lazy } from "react";
// import Home from './../../views/Home';

const Home = lazy(() => import("../../views/Home"));

const sellerRoutes = [
  {
    path: "/",
    element: <Home></Home>,
    ability: ["admin", "seller"],
  },
];

export default sellerRoutes;
