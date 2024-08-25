import AdminOrderDetailsCard from "../../components/admin/AdminOrderDetailsCard";
import AdminOrderDetailsItem from "../../components/admin/AdminOrderDetailsItem";
import AdminOrderSelect from "./../../components/admin/AdminOrderSelect";

function SellerOrderDetails() {
  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>

        <AdminOrderSelect></AdminOrderSelect>
      </div>

      <div className="p-4 ">
        <div className="flex mb-20  ">
          <AdminOrderDetailsCard></AdminOrderDetailsCard>

          <div className="w-[65%] bg-[#8288ed] rounded-md">
            <div className="flex flex-col pl-6 mb-5 ">
              <AdminOrderDetailsItem></AdminOrderDetailsItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerOrderDetails;
