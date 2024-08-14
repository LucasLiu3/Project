import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const AdminOrderPage = lazy(() => import("../../views/admin/AdminOrderPage"));

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
];

export default adminRoutes;
