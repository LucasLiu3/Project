import DashoboardChart from "../../components/shared/DashboardChart";
import DashboardMessage from "../../components/shared/DashboardMessage";
import DashboardInfo from "../../components/shared/DashboardInfo";
import DashboardOrders from "../../components/shared/DashboardOrders";

function AdminDashboard() {
  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <DashboardInfo></DashboardInfo>
      </div>

      <div className="w-full flex flex-wrap mt-7 ">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <DashoboardChart role="admin" />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <DashboardMessage role="admin"></DashboardMessage>
        </div>

        <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
          <DashboardOrders></DashboardOrders>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
