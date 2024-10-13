import { FaRegEdit } from "react-icons/fa";

function SellerProfileInfo({ userInfo, updatePayment }) {
  return (
    <div className="px-0 md:px-5 py-2">
      <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-300 rounded-md relative">
        {/* <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
          <FaRegEdit />{" "}
        </span> */}
        <div className="flex gap-2">
          <span>Name : </span>
          <span>{userInfo.name}</span>
        </div>
        <div className="flex gap-2">
          <span>Email : </span>
          <span>{userInfo.email}</span>
        </div>
        <div className="flex gap-2">
          <span>Role : </span>
          <span>{userInfo.role}</span>
        </div>
        <div className="flex gap-2">
          <span>Status : </span>

          <p>
            {userInfo.status === "active" ? (
              <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                {userInfo.status}
              </span>
            ) : (
              <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                Pending
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <span>Payment Account : </span>
          <p>
            {userInfo.payment === "active" ? (
              <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                {userInfo.payment}
              </span>
            ) : (
              <span
                onClick={updatePayment}
                className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
              >
                Click Active
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SellerProfileInfo;
