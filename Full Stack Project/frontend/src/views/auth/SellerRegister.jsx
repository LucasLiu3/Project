import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sellerRegister, messageClear } from "../../store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

import toast from "react-hot-toast";

function SellerRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function submitForm(e) {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      return toast.error("Passwords should same");
    }

    dispatch(sellerRegister(state));

    setState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
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

  return (
    <div className="min-w-screen min-h-screen bg-blue-50 flex justify-center items-center mt-3">
      <div className="w-[400px] p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4 font-bold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-sm mb-6 text-gray-600">
          Fill in the details below to register
        </p>

        <form onSubmit={submitForm}>
          <div className="flex flex-col w-full gap-2 mb-4">
            <label htmlFor="name" className="text-gray-700">
              Name
            </label>
            <input
              className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md outline-none"
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              required
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-4">
            <label htmlFor="email" className="text-gray-700">
              Email
            </label>
            <input
              className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md outline-none"
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              required
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-4">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md outline-none"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              required
              value={state.password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full gap-2 mb-4">
            <label htmlFor="confirmPassword" className="text-gray-700">
              Confirm Password
            </label>
            <input
              className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-md outline-none"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              id="confirmPassword"
              required
              value={state.confirmPassword}
              onChange={(e) =>
                setState({ ...state, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              className="w-4 h-4 text-blue-600 bg-gray-200 border border-gray-300 rounded"
              type="checkbox"
              name="checkbox"
              id="checkbox"
              required
            />
            <label htmlFor="checkbox" className="text-gray-700">
              Privacy policy & terms
            </label>
          </div>

          <button
            disabled={loader}
            className="bg-blue-600 w-full hover:bg-blue-700 text-white rounded-md px-7 py-2 mb-4"
          >
            {loader ? (
              <PropagateLoader color="#ffffff" cssOverride={overRideStyle} />
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="flex items-center mb-4 gap-3 justify-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                className="font-bold text-indigo-300 px-2"
                to="/seller/login"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerRegister;
