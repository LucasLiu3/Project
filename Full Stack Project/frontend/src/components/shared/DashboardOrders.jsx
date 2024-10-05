import { Link } from "react-router-dom";
import { HeadModule } from "./HeadModule";
import { ContentModule } from "./ContentModule";

function DashboardOrders({ role, recentOrder }) {
  const headerTitle = [
    "Order Id",
    "Price",
    "Payment Status",
    "Order Status",
    "Action",
  ];

  return (
    <>
      <div className="flex justify-between items-center text-[#d0d2d6] font-semibold pb-3">
        <h2 className="text-lg">Recent Orders</h2>
        <Link className="text-sm" to="/admin/orders">
          View All
        </Link>
      </div>

      <div className="relative overflow-y-auto ">
        <table className="w-full text-sm text-[#d0d2d6] ">
          <thead className="py-3 px-4 uppercase border-b border-slate-700">
            <HeadModule headerTitle={headerTitle}></HeadModule>
          </thead>

          <tbody>
            <ContentModule
              data={recentOrder}
              content="order"
              role={role}
            ></ContentModule>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DashboardOrders;
