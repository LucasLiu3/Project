import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { update_order } from "../../store/Reducers/orderReducer";
import { useEffect } from "react";
import { seller_update_payment_status } from "../../store/Reducers/sellerReducer";
import { get_user_info } from "../../store/Reducers/authReducer";

function StripePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (userInfo) {
        dispatch(seller_update_payment_status(userInfo._id));
      }

      dispatch(get_user_info());

      setTimeout(function () {
        navigate("/seller/profile");
      }, 1500);
    },
    [userInfo, dispatch, navigate]
  );

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-center flex-col items-center h-[400px]">
        <div className="flex justify-center items-center h-100%">
          <img src="/images/success.png" alt="" />
        </div>
        <div className="text-xl font-bold mt-5 mb-10">
          <h1>Your Payment Account created successfully.</h1>
        </div>
      </div>
    </div>
  );
}

export default StripePage;
