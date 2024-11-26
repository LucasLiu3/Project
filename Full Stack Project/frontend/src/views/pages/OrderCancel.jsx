import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

function OrderCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(function () {
      navigate("/customerDashboard/myOrders");
    }, 3000);
  }, [navigate]);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-center flex-col items-center h-[400px]">
        <div className="flex justify-center items-center h-100%">
          <img src="/images/error.png" alt="" />
        </div>
        <div className="text-xl font-bold mt-5 mb-10">
          <h1>Due to Product Out of order, Your order has been cancelled.</h1>
        </div>
      </div>
    </div>
  );
}

export default OrderCancel;
