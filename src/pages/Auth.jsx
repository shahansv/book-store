import React from "react";
import logo from "../assets/bookLogo.png";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div
        id="home-bg-img"
        className="h-screen w-full bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
          <div className="bg-white backdrop-blur-md w-96 rounded-2xl p-10 shadow-2xl border border-white/30">
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="h-20 drop-shadow-md" />
              <h1 className="text-center text-2xl font-bold mt-3 text-slate-800 tracking-wide">
                LOGIN
              </h1>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email ID"
                className="border border-slate-300 placeholder:text-slate-500 w-full py-3 px-4 rounded-xl text-black outline-none  focus:border-blue-400 transition"
              />

              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 placeholder:text-slate-500 w-full py-3 px-4 rounded-xl text-black outline-none focus:border-blue-400 transition"
              />

              <div className="flex justify-between items-center">
                <p className="text-xs text-yellow-400">
                  *Never share your password
                </p>
                <p className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Forgot Password?
                </p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold tracking-wide shadow-md">
                Login
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 h-px bg-slate-300"></div>
                <span className="px-3 text-slate-600 text-sm">OR</span>
                <div className="flex-1 h-px bg-slate-300"></div>
              </div>

              <h6 className="text-center text-slate-700 text-sm">
                New User?
                <Link
                  to={"/register"}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Register
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
