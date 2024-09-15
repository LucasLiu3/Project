import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  customerLogin,
  messageClear,
} from "./../../store/Reducers/customerReducer";
import NewButton from "../../components/shared/NewButton";

import toast from "react-hot-toast";
import { RiAdminLine } from "react-icons/ri";
import { ImUserTie } from "react-icons/im";

function CustomerLogin() {
  const { loader, successMessage, errorMessage, customerInfo } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function login(e) {
    e.preventDefault();

    dispatch(customerLogin(state));
  }

  useEffect(() => {
    if (successMessage) {
      setState({
        email: "",
        password: "",
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
              Log in
            </h2>

            <div>
              <form className="text-slate-600" onSubmit={login}>
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

                <NewButton loader={loader}>Log in</NewButton>

                <p className="flex justify-center text-slate-600">
                  Don't have an account?
                  <Link to="/register" className="text-indigo-300 px-2">
                    Register
                  </Link>
                </p>
              </form>
            </div>

            <div className="w-full flex justify-center items-center mb-4 pt-4">
              <div className="w-[45%] bg-gray-300 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="px-1 text-gray-600">Or</span>
              </div>
              <div className="w-[45%] bg-gray-300 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <Link to="/seller/login">
                <div
                  className="w-[135px] h-[35px] flex rounded-md bg-red-500 shadow-lg
                hover:shadow-red-500/50 justify-center cursor-pointer items-center
                overflow-hidden"
                >
                  <RiAdminLine />
                  <span className="text-md pl-2">Seller</span>
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
          </div>
          <div className="w-full h-full py-4 pr-4">
            <img src="images1/login.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
