import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerLogin, messageClear } from "../../store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";

import { PropagateLoader } from "react-spinners";

import { FaUser } from "react-icons/fa";

import { ImUserTie } from "react-icons/im";

import toast from "react-hot-toast";

function SellerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, successMessage, errorMessage, role } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function submitForm(e) {
    e.preventDefault();

    dispatch(sellerLogin(state));
    setState({ email: "", password: "" });
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/seller/dashboard");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

  const overRideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  if (role === "seller") return <Navigate to="/seller/dashboard" replace />;

  return (
    <div className="min-w-screen min-h-screen bg-blue-50 flex justify-center items-center mt-3">
      <div className="w-[500px] text-[#1a202c] p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl mb-3 font-bold text-gray-800">
            Welcome to EasyShop.com
          </h2>
          <p className="text-sm mb-4 text-gray-600">
            Please sign in to your account
          </p>

          <form onSubmit={submitForm}>
            <div className="flex flex-col w-full gap-2 mb-4">
              <label htmlFor="email" className="text-gray-600">
                Email
              </label>

              <input
                className="px-3 py-2 outline-none border border-gray-300 bg-gray-100 rounded-md"
                type="text"
                name="email"
                placeholder="email"
                id="email"
                required
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-full gap-2 mb-4">
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>

              <input
                className="px-3 py-2 outline-none border border-gray-300 bg-gray-100 rounded-md"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>

            <button
              disabled={loader}
              className="bg-blue-600 w-full hover:bg-blue-700 text-white rounded-md px-7 py-2 mb-4"
            >
              {loader ? (
                <PropagateLoader color="#ffffff" cssOverride={overRideStyle} />
              ) : (
                "Log in"
              )}
            </button>

            <div className="flex items-center mb-4 gap-3 justify-center">
              <p>
                Don't have an account?{" "}
                <Link
                  className="font-bold text-indigo-300 px-2"
                  to="/seller/register"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="w-full flex justify-center items-center mb-4">
              <div className="w-[45%] bg-gray-300 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="px-1 text-gray-600">Or</span>
              </div>
              <div className="w-[45%] bg-gray-300 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <Link to="/login">
                <div
                  className="w-[135px] h-[35px] flex rounded-md bg-red-500 shadow-lg
                hover:shadow-red-500/50 justify-center cursor-pointer items-center
                overflow-hidden"
                >
                  <FaUser />
                  <span className="text-md pl-2">Customer</span>
                </div>
              </Link>

              <Link to="/admin/login">
                <div
                  className="w-[135px] h-[35px] flex rounded-md bg-blue-500 shadow-lg
                hover:shadow-blue-500/50 justify-center cursor-pointer items-center
                overflow-hidden"
                >
                  <ImUserTie />
                  <span className="text-md pl-2">Admin</span>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;
