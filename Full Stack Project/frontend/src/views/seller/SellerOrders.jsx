import { useState } from "react";

import Pagination from "../../components/Pagination";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "./../../components/shared/ContentModule";
import Filter from "../../components/shared/Filter";

function SellerOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  const headerTitle = [
    "Order Id",
    "Price",
    "Payment Status",
    "Order Status",
    "Action",
  ];

  const fakeContent = [
    {
      orderId: 1,
      price: "333",
      payment_status: "paid",
      orderStatue: "pending",
    },
    {
      orderId: 1,
      price: "333",
      payment_status: "paid",
      orderStatue: "pending",
    },
    {
      orderId: 1,
      price: "333",
      payment_status: "paid",
      orderStatue: "pending",
    },
    {
      orderId: 1,
      price: "333",
      payment_status: "paid",
      orderStatue: "pending",
    },
    {
      orderId: 1,
      price: "333",
      payment_status: "paid",
      orderStatue: "pending",
    },
  ];

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
              data={fakeContent}
              content="order"
              role="seller"
            ></ContentModule>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4 mr-4 bottom-4 right-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={35}
          showPageNmber={3}
        ></Pagination>
      </div>
    </div>
  );
}

export default SellerOrders;
