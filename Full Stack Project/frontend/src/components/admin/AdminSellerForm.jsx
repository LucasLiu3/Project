import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/Button";
import {
  messageClear,
  update_status,
} from "./../../store/Reducers/sellerReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminSellerForm({ seller, sellerID }) {
  const dispatch = useDispatch();

  const { successMessage } = useSelector((state) => state.seller);

  const [status, setStatus] = useState("");

  function updateStatus(e) {
    e.preventDefault();

    dispatch(update_status({ sellerID, status }));
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
      }
    },
    [successMessage, dispatch]
  );

  useEffect(
    function () {
      if (seller) {
        setStatus(seller.status);
      }
    },
    [seller, dispatch]
  );

  return (
    <div>
      <form onSubmit={updateStatus}>
        <div className="flex gap-4 py-3">
          <select
            className="px-4 py-2 focus:border-slate-700 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            name=""
            id=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">--Select Status--</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
            <option value="pending">Pending</option>
          </select>

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default AdminSellerForm;
