import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, messageClear } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NewButton from "../../components/shared/NewButton";

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

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <div className="min-w-screen min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="w-[400px] p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="h-[70px] flex items-center justify-center mb-6">
            <div className="w-[180px] h-[50px]">
              <img className="w-full" src="/images/logo.png" alt="Logo" />
            </div>
          </div>

          <form onSubmit={submitForm}>
            <div className="flex flex-col w-full gap-2 mb-4">
              <label htmlFor="email" className="text-gray-700">
                Email
              </label>

              <input
                className="px-3 py-2 outline-none border border-gray-300 bg-gray-100 rounded-md text-black"
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
                className="px-3 py-2 outline-none border border-gray-300 bg-gray-100 rounded-md"
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

            <NewButton loader={loader}>Log in</NewButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
