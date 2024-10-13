import { useParams } from "react-router-dom";
import AdminOrderDetailsCard from "../../components/admin/AdminOrderDetailsCard";
import AdminOrderDetailsItem from "../../components/admin/AdminOrderDetailsItem";
import AdminOrderSelect from "./../../components/admin/AdminOrderSelect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_order_details_admin,
  messageClear,
  order_update_admin,
} from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

function AdminOrderDetails() {
  const { orderId } = useParams();

  const dispatch = useDispatch();

  const { oneOrder, ordersDetail, successMessage, errorMessage } = useSelector(
    (state) => state.order
  );
  const [orderState, setOrderState] = useState(oneOrder?.delivery_status || "");

  useEffect(() => {
    if (oneOrder && oneOrder.delivery_status) {
      setOrderState(oneOrder.delivery_status);
    }
  }, [oneOrder]);

  useEffect(
    function () {
      dispatch(get_order_details_admin(orderId));
    },
    [dispatch, orderId]
  );

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

  function updateOrderState(e) {
    dispatch(order_update_admin({ orderId, state: e.target.value }));
    setOrderState(e.target.value);
  }

  return (
    <div className="w-full p-4 bg-[#f8f9fa] rounded-md">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl text-[#212529]">Order Details</h2>

        <AdminOrderSelect
          orderState={orderState}
          updateOrderState={updateOrderState}
        ></AdminOrderSelect>
      </div>

      <div className="p-4 ">
        <div className="flex mb-20  ">
          <AdminOrderDetailsCard orders={oneOrder}></AdminOrderDetailsCard>

          <div className="w-[65%] bg-[#e9ecef] rounded-md">
            <div className="flex flex-col pl-6 mb-5 ">
              <AdminOrderDetailsItem
                ordersDetail={ordersDetail}
              ></AdminOrderDetailsItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetails;
