import { useEffect, useState } from "react";
import Button from "../../components/shared/Button";
import { HeadModule } from "./../../components/shared/HeadModule";
import { ContentModule } from "../../components/shared/ContentModule";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_payment_details,
  messageClear,
  seller_request_withdraw,
} from "../../store/Reducers/paymentReducer";

import { BsCurrencyDollar } from "react-icons/bs";

import toast from "react-hot-toast";

function SellerPayments() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [withdraw, setWithdraw] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const {
    totalAmount,
    pendingAmount,
    withdrawalAmount,
    availableAmount,
    pendingPayment,
    successPayment,
    successMessage,
  } = useSelector((state) => state.payment);

  const headTitle = ["No", "Amount", "Status", "Date"];

  useEffect(
    function () {
      dispatch(get_seller_payment_details(userInfo._id));
    },
    [userInfo, dispatch]
  );

  const displayInfo = [
    {
      title: "Total Sales",
      number: `${totalAmount.toFixed(2)}`,
      icon: <BsCurrencyDollar></BsCurrencyDollar>,
      bgColor: "#fae8e8",
      textColor: "#5c5a5a",
      iconColor: "#fa0305",
    },
    {
      title: "Available amount",
      number: `${availableAmount.toFixed(2)}`,
      icon: <BsCurrencyDollar></BsCurrencyDollar>,
      bgColor: "#fde2ff",
      textColor: "#5c5a5a",
      iconColor: "#760077",
    },

    {
      title: "Pending amount",
      number: `${pendingAmount.toFixed(2)}`,
      icon: <BsCurrencyDollar></BsCurrencyDollar>,
      bgColor: "#ecebff",
      textColor: "#5c5a5a",
      iconColor: "#0200f8",
    },
    {
      title: "Withdraw amount",
      number: `${withdrawalAmount.toFixed(2)}`,
      icon: <BsCurrencyDollar></BsCurrencyDollar>,
      bgColor: "#e9feea",
      textColor: "#5c5a5a",
      iconColor: "#038000",
    },
  ];

  function sendRequest(e) {
    e.preventDefault();
    if (withdraw >= availableAmount) {
      toast.error("Insufficient balance");
      setWithdraw("");
      return;
    }
    dispatch(seller_request_withdraw({ sellerId: userInfo._id, withdraw }));
    setWithdraw("");
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        dispatch(get_seller_payment_details(userInfo._id));
      }
    },
    [successMessage, userInfo, dispatch]
  );

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {displayInfo.map((info, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-6 rounded-md gap-3 bg-[}]`}
            style={{ backgroundColor: info.bgColor }}
          >
            <div
              className={`flex flex-col justify-start items-start text-[${info.textColor}]`}
              style={{ color: info.textColor }}
            >
              <h2 className="text-3xl font-bold">{info.number}</h2>
              <span className="text-md font-medium">{info.title}</span>
            </div>

            <div
              className={`w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl bg-[${info.iconColor}]`}
              style={{ backgroundColor: info.iconColor }}
            >
              <div className="text-white shadow-lg">{info.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 mt-5">
        <div className="bg-[#6a5fdf] text-[#d0d2d6] rounded-md p-5 w-full">
          <span className="text-lg">Sending Request</span>

          <div className="pt-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  type="number"
                  name="amountRequest"
                  id=""
                  onChange={(e) => setWithdraw(e.target.value)}
                  value={withdraw}
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
                    data={pendingPayment}
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
                    data={successPayment}
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
