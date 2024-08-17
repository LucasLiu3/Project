import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const AdminOrderPage = lazy(() => import("../../views/admin/AdminOrderPage"));
const AdminChat = lazy(() => import("../../views/admin/AdminChat"));

const AdminCategoryPage = lazy(() =>
  import("../../views/admin/AdminCategoryPage")
);
const AdminSellersPage = lazy(() =>
  import("../../views/admin/AdminSellersPage")
);
const AdminPaymentRequest = lazy(() =>
  import("../../views/admin/AdminPaymentRequest")
);
const AdminSellerDetails = lazy(() =>
  import("../../views/admin/AdminSellerDetails")
);
const AdminOrderDetails = lazy(() =>
  import("../../views/admin/AdminOrderDetails")
);

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard></AdminDashboard>,
    role: "admin",
  },
  {
    path: "/admin/orders",
    element: <AdminOrderPage></AdminOrderPage>,
    role: "admin",
  },
  {
    path: "/admin/order/:orderId",
    element: <AdminOrderDetails></AdminOrderDetails>,
    role: "admin",
  },
  {
    path: "/admin/category",
    element: <AdminCategoryPage></AdminCategoryPage>,
    role: "admin",
  },
  {
    path: "/admin/sellers",
    element: <AdminSellersPage></AdminSellersPage>,
    role: "admin",
  },
  {
    path: "/admin/seller/:sellerID",
    element: <AdminSellerDetails></AdminSellerDetails>,
    role: "admin",
  },
  {
    path: "/admin/payment_request",
    element: <AdminPaymentRequest></AdminPaymentRequest>,
    role: "admin",
  },
  {
    path: "/admin/chat",
    element: <AdminChat></AdminChat>,
    role: "admin",
  },
];

export default adminRoutes;
