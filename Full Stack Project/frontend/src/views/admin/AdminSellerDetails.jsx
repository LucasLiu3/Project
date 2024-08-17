import AdminSellerDetailHeader from "../../components/admin/AdminSellerDetailHeader";
import AdminSellerForm from "../../components/admin/AdminSellerForm";
import AdminSellerInfo from "../../components/admin/AdminSellerInfo";

function AdminSellerDetails() {
  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <div className="flex flex-warp text-[#d0d2d6] lg:gap-0 md:gap-9">
        <AdminSellerDetailHeader></AdminSellerDetailHeader>

        <div className="w-4/12">
          <AdminSellerInfo></AdminSellerInfo>

          <AdminSellerForm></AdminSellerForm>
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;
