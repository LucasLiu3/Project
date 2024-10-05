import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  create_payment,
  update_order,
} from "../../store/Reducers/orderReducer";
import { useEffect } from "react";

function StripePage() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(update_order(orderId));
      dispatch(create_payment(orderId));
    }

    setTimeout(function () {
      navigate("/customerDashboard/myOrders");
    }, 2000);
  }, [orderId, dispatch, navigate]);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-center flex-col items-center h-[400px]">
        <div className="flex justify-center items-center h-100%">
          <img src="/images/success.png" alt="" />
        </div>
        <div className="text-xl font-bold mt-5 mb-10">
          <h1>Payment Successful for Order: {orderId}</h1>
        </div>
      </div>
    </div>
  );
}

export default StripePage;
