import { useEffect, useState } from "react";

import Pagination from "../../components/Pagination";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "./../../components/shared/ContentModule";
import Filter from "../../components/shared/Filter";
import { useDispatch, useSelector } from "react-redux";
import { get_orders_admin } from "../../store/Reducers/orderReducer";

function AdminOrderPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  const { orders } = useSelector((state) => state.order);

  const headerTitle = [
    "Order Id",
    "Price",
    "Payment Status",
    "Order Status",
    "Action",
  ];

  useEffect(
    function () {
      dispatch(get_orders_admin());
    },
    [dispatch]
  );

  if (!orders) return <div>Loading....</div>;

  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <Filter
        perPage={perPage}
        setPerPage={setPerPage}
        setSearchContent={setSearchContent}
      ></Filter>

      <div className="relative mt-5 overflow-y-auto">
        <table className="w-full text-sm text-[#d0d2d6]">
          <thead className=" uppercase border-b border-slate-700">
            <HeadModule headerTitle={headerTitle}></HeadModule>
          </thead>

          <tbody>
            <ContentModule
              data={orders}
              content="order"
              role="admin"
            ></ContentModule>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4 mr-4 bottom-4 right-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={orders.length}
          showPageNmber={3}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminOrderPage;
