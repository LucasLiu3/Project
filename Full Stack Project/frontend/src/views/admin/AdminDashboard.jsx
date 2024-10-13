import DashoboardChart from "../../components/shared/DashboardChart";
import DashboardMessage from "../../components/shared/DashboardMessage";
import DashboardInfo from "../../components/shared/DashboardInfo";
import DashboardOrders from "../../components/shared/DashboardOrders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_get_dashboard_data } from "../../store/Reducers/dashboardReducer";

function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);

  useEffect(
    function () {
      dispatch(admin_get_dashboard_data());
    },
    [dispatch]
  );

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <DashboardInfo
          totalSale={totalSale}
          totalOrder={totalOrder}
          totalProduct={totalProduct}
          totalSeller={totalSeller}
        ></DashboardInfo>
      </div>

      <div className="w-full flex flex-wrap mt-7 ">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#f8f9fa] p-4 rounded-md">
            <DashoboardChart role="admin" />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <DashboardMessage
            role="admin"
            recentMessage={recentMessage}
          ></DashboardMessage>
        </div>

        <div className="w-full p-4 bg-[#f8f9fa] rounded-md mt-6">
          <DashboardOrders recentOrder={recentOrder}></DashboardOrders>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
