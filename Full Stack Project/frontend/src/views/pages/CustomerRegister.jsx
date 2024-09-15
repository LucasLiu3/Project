import { Link } from "react-router-dom";
import NewButton from "../../components/shared/NewButton";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {
  customerRegister,
  messageClear,
} from "./../../store/Reducers/customerReducer";

function CustomerRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, successMessage, errorMessage, customerInfo } = useSelector(
    (state) => state.customer
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function register(e) {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      return toast.error("Passwords should same");
    }

    dispatch(customerRegister(state));
  }

  useEffect(() => {
    if (successMessage) {
      setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (customerInfo) navigate("/");
  }, [successMessage, errorMessage, dispatch, navigate, customerInfo]);

  return (
    <div className="bg-blue-50 mt-4 ">
      <div className="w-full justify-center items-center p-40">
        <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
          <div className="px-8 py-8 ">
            <h2 className="text-center w-full text-xl text-slate-600 font-bold">
              Register
            </h2>

            <div>
              <form className="text-slate-600" onSubmit={register}>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                    className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-slate-500 rounded-md"
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-slate-500 rounded-md"
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-slate-500 rounded-md"
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-slate-500 rounded-md"
                    onChange={(e) =>
                      setState({ ...state, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <NewButton loader={loader}>Register</NewButton>

                <p className="flex justify-center text-slate-600">
                  Already have an account?
                  <Link to="/login" className="text-indigo-300 px-2">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="w-full h-full py-4 pr-4">
            <img src="images1/login.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
