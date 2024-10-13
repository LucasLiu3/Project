import { Link } from "react-router-dom";

function SellerDeactive() {
  return (
    <div className="flex justify-center items-center h-[530px]">
      <span className="text-2xl font-semibold">
        Your account is deacived, plese contact Admin!
      </span>
      <Link
        to="/seller/admin_chat"
        className="text-indigo-800 pl-4 text-xl hover:underline "
      >
        Click
      </Link>
    </div>
  );
}

export default SellerDeactive;
