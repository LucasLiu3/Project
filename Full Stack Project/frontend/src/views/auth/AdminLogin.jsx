import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, messageClear } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function submitForm(e) {
    e.preventDefault();

    dispatch(adminLogin(state));
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        navigate("/admin/dashboard");
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    },
    [successMessage, errorMessage, dispatch, navigate]
  );

  const overRideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <div
      className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center
    "
    >
      <div className="w-[400px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex items-center justify-center">
            <div className="w-[180px] h-[50px]">
              <img className="w-full" src="/images/logo.png" alt="" />
            </div>
          </div>

          <form onSubmit={submitForm}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={loader ? true : false}
              className="bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#ffffff" cssOverride={overRideStyle} />
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
