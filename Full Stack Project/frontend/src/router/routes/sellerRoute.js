import { lazy } from "react";

import TestPage from "../../components/sellers/TestPage";
// import Home from './../../views/Home';

// const Home = lazy(() => import("../../views/Home"));

const sellerRoutes = [
  {
    path: "/seller/dashboard",
    element: <TestPage></TestPage>,
    ability: ["admin", "seller"],
  },
];

export default sellerRoutes;
