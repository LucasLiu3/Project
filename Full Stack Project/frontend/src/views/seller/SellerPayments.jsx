import { useState } from "react";
import Button from "../../components/shared/Button";
import DashboardInfo from "../../components/shared/DashboardInfo";
import { HeadModule } from "./../../components/shared/HeadModule";
import { ContentModule } from "../../components/shared/ContentModule";
import Pagination from "../../components/Pagination";

function SellerPayments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const headTitle = ["No", "Amount", "Status", "Date"];

  const fakeContent = [
    {
      requestID: 1,
      amount: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      amount: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      amount: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      amount: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
    {
      requestID: 1,
      amount: "333",
      request_status: "pending",
      date: "25 Dec 2023",
    },
  ];

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <DashboardInfo></DashboardInfo>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 mt-5">
        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5 w-full">
          <span className="text-lg">Sending Request</span>

          <div className="pt-5">
            <form>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  name="amountRequest"
                  id=""
                  className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] md:w-[70%]
                            border bg-transparent border-slate-700 text-white focus:border-indigo-700 
                            overflow-hidden outline-none placeholder-bold"
                  min="0"
                />
                <Button>Submit</Button>
              </div>
            </form>
          </div>

          <div className="pt-5 mt-5">
            <h2 className="text-lg">Pending Request</h2>

            <div className="relative mt-5 overflow-y-auto">
              <table className="w-full text-sm text-[#d0d2d6]">
                <thead className=" uppercase border-b border-slate-700">
                  <HeadModule headerTitle={headTitle}></HeadModule>
                </thead>

                <tbody>
                  <ContentModule
                    data={fakeContent}
                    content="payment"
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
        </div>

        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5 w-full">
          <span className="text-lg">Success Request</span>

          <div>
            <div className="relative mt-5 overflow-y-auto">
              <table className="w-full text-sm text-[#d0d2d6]">
                <thead className=" uppercase border-b border-slate-700">
                  <HeadModule headerTitle={headTitle}></HeadModule>
                </thead>

                <tbody>
                  <ContentModule
                    data={fakeContent}
                    content="payment"
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
        </div>
      </div>
    </>
  );
}

export default SellerPayments;
