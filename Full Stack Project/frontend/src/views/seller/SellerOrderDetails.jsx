import { useParams } from "react-router-dom";
import AdminOrderDetailsCard from "../../components/admin/AdminOrderDetailsCard";
import AdminOrderDetailsItem from "../../components/admin/AdminOrderDetailsItem";
import AdminOrderSelect from "./../../components/admin/AdminOrderSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_order_details_seller,
  messageClear,
  order_update_seller,
} from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

function SellerOrderDetails() {
  const { orderId } = useParams();

  const { oneOrder, ordersDetail, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();

  const [orderState, setOrderState] = useState(
    ordersDetail?.delivery_status || ""
  );

  useEffect(() => {
    if (ordersDetail && ordersDetail.delivery_status) {
      setOrderState(ordersDetail.delivery_status);
    }
  }, [ordersDetail]);

  useEffect(
    function () {
      dispatch(get_order_details_seller(orderId));
    },
    [orderId, dispatch]
  );

  function updateOrderState(e) {
    dispatch(order_update_seller({ orderId, state: e.target.value }));
    setOrderState(e.target.value);
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        dispatch(get_order_details_seller(orderId));
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    },
    [successMessage, errorMessage, dispatch, orderId]
  );

  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>

        <AdminOrderSelect
          orderState={orderState}
          updateOrderState={updateOrderState}
        ></AdminOrderSelect>
      </div>

      <div className="p-4 ">
        <div className="flex mb-20  ">
          <AdminOrderDetailsCard orders={oneOrder}></AdminOrderDetailsCard>

          <div className="w-[65%] bg-[#8288ed] rounded-md">
            <div className="flex flex-col pl-6 mb-5 ">
              <AdminOrderDetailsItem
                ordersDetail={ordersDetail}
                role="seller"
              ></AdminOrderDetailsItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerOrderDetails;
