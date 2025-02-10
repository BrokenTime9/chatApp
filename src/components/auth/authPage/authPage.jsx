import React, { useContext, useState } from "react";
import { GoogleLoginButton } from "../googleAuth/google";
import Register from "../localAuth/register";
import MobileContext from "../../dashboard/context/mobileWidth";

export const Login = () => {
  const { isMobile } = useContext(MobileContext);
  return (
    <div
      className={`flex items-center justify-center min-h-[100dvh] w-screen   bg-gradient-to-tr from-gray-400 to-white cursor-default`}
    >
      <div
        className={`${!isMobile ? "max-w-sm" : "max-w-[80%]"} max-h-[95dvh] w-full  p-6 bg-white rounded-sm shadow-lg`}
      >
        {/* Header: Logo and Button with offset effect */}
        <div
          className={`flex items-center p-8 pt-2 ${isMobile ? "flex-col items-start w-full" : "flex-row justify-center"}`}
        >
          <h1 className="text-5xl text-blue-600 self-start">呼 </h1>
          <h1 className="text-black text-5xl self-start">ぶ</h1>
        </div>

        {/* Register/Login Form */}
        <Register mode={"login"} />
        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center mt-6 mb-6">
          <span className="absolute bg-gray-100 text-black px-4 text-sm font-medium">
            OR
          </span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton />
        <div
          className="font-semibold flex justify-center cursor-pointer"
          onClick={() => (window.location.href = "/signup")}
        >
          <p className=" mt-12">
            No account? No chat!{" "}
            <span className="text-blue-800">Sign up here!?</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export const Signup = () => {
  const { isMobile } = useContext(MobileContext);
  return (
    <div
      className={`flex items-center justify-center min-h-[100dvh] w-screen   bg-gradient-to-tr from-gray-400 to-white cursor-default`}
    >
      <div
        className={`max-w-sm max-h-[95dvh] ${!isMobile ? "w-full" : "w-90%"} p-6 bg-white rounded-sm shadow-lg`}
      >
        <div
          className={`flex items-center p-8 ${isMobile ? "flex-col items-start w-full" : "flex-row justify-center"}`}
        >
          <h1 className="text-5xl text-blue-600 self-start">呼 </h1>
          <h1 className="text-black text-5xl self-start">ぶ</h1>
        </div>

        <Register mode={"register"} />
        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center mt-6 mb-6">
          <span className="absolute bg-white text-black px-4 text-sm font-medium">
            OR
          </span>
          <hr className="w-full border-gray-300" />
        </div>
        {/* Google Login Button */}
        <GoogleLoginButton />
        <div
          className="font-semibold flex justify-center cursor-pointer"
          onClick={() => (window.location.href = "/signin")}
        >
          <p className=" mt-12">
            You’re already famous here -
            <span className="text-blue-800"> Sign in!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
