import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";



function Register() {

  const [state,setState] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  });


  function submitForm(e){
    e.preventDefault()
    console.log(state)

    setState({
      name:'',
      email:'',
      password:'',
      confirmPassword:''
    })
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
            Please register your account
          </p>

          <form onSubmit={submitForm}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                required
                value={state.name}
                onChange={(e)=>setState({
                  ...state, name:e.target.value
                })}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
                value={state.email}
                onChange={(e)=>setState({
                  ...state, email:e.target.value
                })}
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
                onChange={(e)=>setState({
                  ...state, password:e.target.value
                })}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                id="confirmPassword"
                required
                value={state.confirmPassword}
                onChange={(e)=>setState({
                  ...state, confirmPassword:e.target.value
                })}
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
                required
              />
              <label htmlFor="checkbox">Privacy policy & terms</label>
            </div>

            <button className="bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Sign Up
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account?{" "}
                <Link className="font-bold" to="/login">
                  Log in
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

              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg
              hover:shadow-orange-700/50 justify-center cursor-pointer items-center
              overflow-hidden">
                <FaGoogle />
              </div>

              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg
              hover:shadow-blue-700/50 justify-center cursor-pointer items-center
              overflow-hidden">
                <FaFacebook />

              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
