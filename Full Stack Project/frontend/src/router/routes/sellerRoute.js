import { lazy } from "react";

const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const SellerNewProduct = lazy(() =>
  import("../../views/seller/SellerNewProduct")
);
const SellerAllProducts = lazy(() =>
  import("../../views/seller/SellerAllProducts")
);

const sellerRoutes = [
  {
    path: "/seller/dashboard",
    element: <SellerDashboard></SellerDashboard>,
    ability: ["seller"],
  },
  {
    path: "/seller/new_product",
    element: <SellerNewProduct></SellerNewProduct>,
    ability: ["seller"],
  },
  {
    path: "/seller/products",
    element: <SellerAllProducts></SellerAllProducts>,
    ability: ["seller"],
  },
];

export default sellerRoutes;
