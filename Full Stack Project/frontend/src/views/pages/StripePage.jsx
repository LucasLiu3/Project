import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { update_order } from "../../store/Reducers/orderReducer";
import { useEffect } from "react";

function StripePage() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (orderId) {
      dispatch(update_order(orderId));
    }

    setTimeout(function () {
      navigate("/customerDashboard/myOrders");
    }, 1000);
  }, [orderId, dispatch, navigate]);

  return (
    <div>
      <h1>Payment Successful for Order: {orderId}</h1>
    </div>
  );
}

export default StripePage;
