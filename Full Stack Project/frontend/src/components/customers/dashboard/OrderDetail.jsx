import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_order_detail } from "../../../store/Reducers/CustomerDashboardReducer";

function OrderDetail() {
  const { orderId } = useParams();

  const { orderDetail } = useSelector((state) => state.customerDashboard);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(get_order_detail(orderId));
    },
    [orderId, dispatch]
  );

  console.log(orderDetail);

  if (!orderDetail || !orderDetail.shippingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl text-slate-600">
            Order Number: #{orderDetail._id}
          </h2>
          <p className="py-1 text-md">Date: {orderDetail.data}</p>
          <p className="py-1 text-md">
            Payment Status:{" "}
            <span
              className={`${
                orderDetail.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } px-3 rounded-md`}
            >
              {orderDetail.payment_status}
            </span>
          </p>
          <p className="py-1 text-md">
            Order Status:
            <span
              className={`${
                orderDetail.payment_status === "paid"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              } px-3 ml-1 rounded-md`}
            >
              {orderDetail.delivery_status}
            </span>
          </p>
          <p className="py-1 text-md">
            Total Price: ${orderDetail.price} (Inc Shipping Fee)
          </p>
        </div>
        <div className="flex flex-col gap-2 mr-20">
          <h2 className="text-lg">Shipping Info</h2>
          <div className="flex flex-col gap-1">
            <span>Name: {orderDetail.shippingInfo.name}</span>
            <span>Email: {orderDetail.shippingInfo.email}</span>
            <span>Phone: {orderDetail.shippingInfo.phone}</span>
            <span>
              Address: {orderDetail.shippingInfo.address}{" "}
              {orderDetail.shippingInfo.city}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
          Order Products
        </h2>

        <div className="flex gap-5 flex-col">
          {orderDetail.product.map((product, index) => (
            <div key={index}>
              <div className="flex gap-5 justify-start items-center text-slate-600">
                <div className="flex gap-2">
                  <img
                    className="w-[60px] h-[60px]"
                    src={product.images[0]}
                    alt=""
                  />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link>{product.product}</Link>
                    <p>
                      <span>Brand: {product.brand}</span>
                    </p>
                    <p>
                      <span>Quantity: {product.quantity}</span>
                    </p>
                  </div>
                </div>

                <div className="pl-4 flex flex-col ">
                  <h2>
                    $
                    {(
                      product.quantity *
                      product.price *
                      (1 - product.discount / 100)
                    ).toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
