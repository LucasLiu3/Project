import { useParams } from "react-router-dom";
import AdminSellerDetailHeader from "../../components/admin/AdminSellerDetailHeader";
import AdminSellerForm from "../../components/admin/AdminSellerForm";
import AdminSellerInfo from "../../components/admin/AdminSellerInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSeller } from "../../store/Reducers/sellerReducer";

function AdminSellerDetails() {
  const { sellerID } = useParams();

  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getSeller(sellerID));
    },
    [sellerID, dispatch]
  );

  return (
    <div className="w-full p-4 bg-[#f8f9fa] rounded-md">
      <div className="flex flex-warp text-[#212529] lg:gap-0 md:gap-9">
        <AdminSellerDetailHeader image={seller.image}></AdminSellerDetailHeader>

        <div className="w-4/12">
          <AdminSellerInfo seller={seller}></AdminSellerInfo>

          <AdminSellerForm
            seller={seller}
            sellerID={sellerID}
          ></AdminSellerForm>
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;
