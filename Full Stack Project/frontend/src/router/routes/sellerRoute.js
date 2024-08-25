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
const SellerOrders = lazy(() => import("../../views/seller/SellerOrders"));
const SellerPayments = lazy(() => import("../../views/seller/SellerPayments"));
const SellerProfile = lazy(() => import("../../views/seller/SellerProfile"));
const SellerChatAdmin = lazy(() =>
  import("../../views/seller/SellerChatAdmin")
);
const SellerChatCustomer = lazy(() =>
  import("../../views/seller/SellerChatCustomer")
);
const SellerProductEdit = lazy(() =>
  import("../../views/seller/SellerProductEdit")
);
const SellerOrderDetails = lazy(() =>
  import("../../views/seller/SellerOrderDetails")
);
const SellerPending = lazy(() => import("../../views/seller/SellerPending"));
const SellerDeactive = lazy(() => import("../../views/seller/SellerDeactive"));

const sellerRoutes = [
  {
    path: "/seller/account-pending",
    element: <SellerPending></SellerPending>,
    role: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <SellerDeactive></SellerDeactive>,
    role: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard></SellerDashboard>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/new_product",
    element: <SellerNewProduct></SellerNewProduct>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/products",
    element: <SellerAllProducts></SellerAllProducts>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/product/edit/:productId",
    element: <SellerProductEdit></SellerProductEdit>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/orders",
    element: <SellerOrders></SellerOrders>,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/order/:orderId",
    element: <SellerOrderDetails></SellerOrderDetails>,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/payments",
    element: <SellerPayments></SellerPayments>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/customer_chat",
    element: <SellerChatCustomer></SellerChatCustomer>,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/admin_chat",
    element: <SellerChatAdmin></SellerChatAdmin>,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/profile",
    element: <SellerProfile></SellerProfile>,
    role: "seller",
    status: "active",
  },
];

export default sellerRoutes;
