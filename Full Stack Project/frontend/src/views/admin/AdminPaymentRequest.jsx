import React, { forwardRef, useState } from "react";

import { HeadModule } from "./../../components/shared/HeadModule";
import Filter from "../../components/shared/Filter";
import { ContentModule } from "../../components/shared/ContentModule";
import Pagination from "../../components/Pagination";
// import { FixedSizeList as List } from "react-window";
// import { Row } from "../../components/admin/AdminPaymentRow";

// function handleOnWheel({ deltaY }) {
//   console.log("handleOnWheel", deltaY);
// }

// const outerElementType = forwardRef((props, ref) => (
//   <div ref={ref} onWheel={handleOnWheel} {...props} />
// ));

// const Row = ({ index, style }) => {
//   return (
//     <div
//       style={style}
//       className="flex text-sm text-white font-medium text-center"
//     >
//       <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
//       <div className="w-[25%] p-2 whitespace-nowrap">$3434</div>
//       <div className="w-[25%] p-2 whitespace-nowrap">
//         <span className="py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm">
//           Pending
//         </span>
//       </div>
//       <div className="w-[25%] p-2 whitespace-nowrap"> 25 Dec 2023 </div>
//       <div className="w-[25%] p-2 whitespace-nowrap">
//         <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]">
//           Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

function AdminPaymentRequest() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  const headTitle = ["No", "Amount", "Status", "Date", "Action"];

  const fakeContent = [
    {
      requestID: 1,
      price: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      price: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      price: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      price: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      price: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
  ];

  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <h2 className="text-xl font-medium pb-5 text-[#d0d2d6]">
        Withdrawal Request
      </h2>

      <Filter
        perPage={perPage}
        setPerPage={setPerPage}
        setSearchContent={setSearchContent}
      ></Filter>

      <div className="relative mt-5 overflow-y-auto">
        <table className="w-full text-sm text-[#d0d2d6]">
          <thead className=" uppercase border-b border-slate-700">
            <HeadModule headerTitle={headTitle}></HeadModule>
          </thead>

          <tbody>
            <ContentModule imageDate={fakeContent}></ContentModule>
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
      {/* {
            <List
              style={{ minWidth: "340px" }}
              className="List"
              height={350}
              itemCount={10}
              itemSize={35}
              outerElementType={outerElementType}
            >
              {Row}
            </List>
          } */}
    </div>
  );
}

export default AdminPaymentRequest;
