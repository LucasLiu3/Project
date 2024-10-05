import React, { forwardRef, useEffect, useState } from "react";

import { HeadModule } from "./../../components/shared/HeadModule";
import Filter from "../../components/shared/Filter";
import { ContentModule } from "../../components/shared/ContentModule";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_approve_withdraw,
  admin_get_withdraw,
  messageClear,
} from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";

function AdminPaymentRequest() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");

  const headTitle = ["No", "Amount", "Status", "Date", "Action"];

  const { pendingPayment, successMessage } = useSelector(
    (state) => state.payment
  );

  useEffect(
    function () {
      dispatch(admin_get_withdraw());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        dispatch(admin_get_withdraw());
      }
    },
    [successMessage, dispatch]
  );

  function approvelRequest(requestId) {
    dispatch(admin_approve_withdraw(requestId));
  }

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
            <ContentModule
              data={pendingPayment}
              content="payment"
              approvelRequest={approvelRequest}
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

export default AdminPaymentRequest;
