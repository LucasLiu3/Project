import AdminChart from "../../components/admin/AdminChart";
import AdminShowInfo from "../../components/admin/AdminShowInfo";
import AdminMessage from "../../components/admin/AdminMessage";
import AdminOrder from "../../components/admin/AdminOrder";

function AdminDashboard() {
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <AdminShowInfo></AdminShowInfo>
      </div>

      <div className="w-full flex flex-wrap mt-7 ">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <AdminChart></AdminChart>
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <AdminMessage></AdminMessage>
        </div>

        <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
          <AdminOrder></AdminOrder>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
