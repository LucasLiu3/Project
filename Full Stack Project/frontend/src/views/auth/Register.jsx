import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useState } from "react";

function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function submitForm(e) {
    e.preventDefault();
    console.log(state);

    setState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="min-w-screen min-h-screen bg-blue-50 flex justify-center items-center">
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

          <button className="bg-blue-600 w-full hover:bg-blue-700 text-white rounded-md px-4 py-2 mb-4">
            Sign Up
          </button>

          <div className="flex items-center mb-4 gap-3 justify-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                className="font-bold text-blue-600 hover:underline"
                to="/login"
              >
                Log in
              </Link>
            </p>
          </div>

          <div className="w-full flex justify-center items-center mb-4">
            <div className="w-[45%] bg-gray-300 h-[1px]"></div>
            <div className="w-[10%] flex justify-center items-center">
              <span className="px-2 text-gray-600">Or</span>
            </div>
            <div className="w-[45%] bg-gray-300 h-[1px]"></div>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="w-[135px] h-[35px] flex rounded-md bg-red-600 shadow-lg hover:bg-red-700 cursor-pointer justify-center items-center">
              <FaGoogle className="text-white" />
            </div>

            <div className="w-[135px] h-[35px] flex rounded-md bg-blue-600 shadow-lg hover:bg-blue-700 cursor-pointer justify-center items-center">
              <FaFacebook className="text-white" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
