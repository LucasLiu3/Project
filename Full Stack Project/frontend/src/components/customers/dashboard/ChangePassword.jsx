import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  change_password,
  messageClear,
} from "../../../store/Reducers/customerReducer";

function ChangePassword() {
  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { customerInfo, successMessage, errorMessage } = useSelector(
    (state) => state.customer
  );

  function changePassword(e) {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      toast.error("New passwords need to be matched");
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    dispatch(
      change_password({
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        customerId: customerInfo.id,
      })
    );
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        return;
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    },

    [successMessage, errorMessage, dispatch, setPassword]
  );

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>

      <form onSubmit={changePassword}>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            value={password.oldPassword}
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirmPassword">Comfirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <button className="px-8 py-2 bg-red-500 text-white rounded-lg hover:shadow-red-500/30 ">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
