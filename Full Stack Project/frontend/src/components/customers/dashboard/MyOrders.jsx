import { RiShoppingCart2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_my_orders } from "../../../store/Reducers/CustomerDashboardReducer";
import { pay_later } from "../../../store/Reducers/orderReducer";
const MyOrders = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState("all");

  const { customerInfo } = useSelector((state) => state.customer);

  const { orders } = useSelector((state) => state.customerDashboard);

  useEffect(
    function () {
      dispatch(get_my_orders(customerInfo.id));
    },
    [dispatch, customerInfo.id]
  );

  const totalOrder = orders.length;

  const pendingOrder = orders.filter(
    (each) => each.delivery_status === "pending"
  ).length;

  const cancelledOrder = orders.filter(
    (each) => each.delivery_status === "cancelled"
  ).length;

  let showOrders;
  if (state === "all") showOrders = orders;
  else {
    showOrders = orders.filter((each) => each.delivery_status === state);
  }

  function redirect(orderId) {
    dispatch(pay_later(orderId));
  }

  return (
    <>
      <div className="grid grid-cols-3  gap-5">
        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders </span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders </span>
          </div>
        </div>

        <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <RiShoppingCart2Fill />
            </span>
          </div>

          <div className="flex flex-col justify-start items-start text-slate-600">
            <h2 className="text-3xl font-bold">{cancelledOrder}</h2>
            <span>Cancelled Orders </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md mt-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-600">My Orders </h2>
          <select
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="all">--ordre status--</option>
            <option value="placed">Placed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        <div className="pt-4">
          <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {showOrders.map((each, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      #{each._id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      ${each.price}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {each.payment_status}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      {each.delivery_status}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <Link
                        to={`/customerDashboard/myOrders/details/${each._id}`}
                      >
                        <span className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded">
                          View
                        </span>
                      </Link>

                      {each.payment_status === "unpaid" && (
                        <span
                          onClick={() => redirect(each._id)}
                          className="bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded hover:cursor-pointer"
                        >
                          Pay Now
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyOrders;
