import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function submitForm(e) {
    e.preventDefault();
    console.log(state);

    setState({ email: "", password: "" });
  }

  return (
    <div
      className="min-w-screen min-h-screen bg-[#cdcae7] flex justify-center items-center
    "
    >
      <div className="w-[500px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-3xl mb-3 font-bold">Welcome to EasyShop.com</h2>
          <p className="text-sm mb-3 font-medium">
            Please sign in your account
          </p>

          <form onSubmit={submitForm}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="text"
                name="email"
                placeholder="email"
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
                placeholder="password"
                id="password"
                required
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
            </div>

            <button className="bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Log in
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don't have an account?{" "}
                <Link className="font-bold" to="/register">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="px-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <div
                className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg
              hover:shadow-orange-700/50 justify-center cursor-pointer items-center
              overflow-hidden"
              >
                <FaGoogle />
              </div>

              <div
                className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg
              hover:shadow-blue-700/50 justify-center cursor-pointer items-center
              overflow-hidden"
              >
                <FaFacebook />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
