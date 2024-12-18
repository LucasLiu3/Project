import { useDispatch, useSelector } from "react-redux";

import SellerProfilePic from "../../components/sellers/SellerProfilePic";
import SellerProfileInfo from "./../../components/sellers/SellerProfileInfo";
import SellerProfileShop from "../../components/sellers/SellerProfileShop";
import PasswordChange from "../../components/shared/PasswordChange";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { messageClear } from "../../store/Reducers/profileReducer";
import { seller_create_payment_account } from "../../store/Reducers/sellerReducer";

function SellerProfile() {
  const dispatch = useDispatch();

  let { profile, loader, successMessage, errorMessage } = useSelector(
    (state) => state.profile
  );

  const { userInfo } = useSelector((state) => state.auth);
  if (!profile) profile = userInfo;

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    },
    [successMessage, errorMessage, dispatch]
  );

  function updatePayment() {
    dispatch(seller_create_payment_account());
  }

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-6/12">
        <div className="w-full p-4 bg-[#f8f9fa] rounded-md text-[#212529]">
          <SellerProfilePic
            userInfo={profile}
            loader={loader}
          ></SellerProfilePic>

          <SellerProfileInfo
            userInfo={profile}
            updatePayment={updatePayment}
          ></SellerProfileInfo>

          <SellerProfileShop userInfo={profile}></SellerProfileShop>
        </div>
      </div>

      <PasswordChange></PasswordChange>
    </div>
  );
}

export default SellerProfile;
