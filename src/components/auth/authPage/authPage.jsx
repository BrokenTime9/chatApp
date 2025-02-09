import React, { useContext, useState } from "react";
import { GoogleLoginButton } from "../googleAuth/google";
import Register from "../localAuth/register";
import MobileContext from "../../dashboard/context/mobileWidth";

export const Login = () => {
  const { isMobile } = useContext(MobileContext);
  return (
    <div
      className={`flex items-center justify-center min-h-[100dvh] w-screen  ${isMobile ? "bg-black" : " bg-gradient-to-r from-black to-gray-800"} cursor-default`}
    >
      <div
        className={`max-w-sm max-h-[95dvh] ${!isMobile ? "w-full" : "w-90%"} p-6 bg-black rounded-sm shadow-lg`}
      >
        {/* Header: Logo and Button with offset effect */}
        <div className="flex justify-center items-center p-8">
          <h1 className="text-5xl text-blue-600">
            呼<span className="text-white">ぶ</span>
          </h1>
        </div>

        {/* Register/Login Form */}
        <Register mode={"login"} />
        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center mt-6 mb-6">
          <span className="absolute bg-black text-white px-4 text-sm font-medium">
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
          <p className="text-white mt-12">
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
      className={`flex items-center justify-center min-h-[100dvh] w-screen  ${isMobile ? "bg-black" : " bg-gradient-to-r from-black to-gray-800"} cursor-default`}
    >
      <div
        className={`max-w-sm max-h-[95dvh] ${!isMobile ? "w-full" : "w-90%"} p-6 bg-black rounded-sm shadow-lg`}
      >
        {/* Header: Logo and Button with offset effect */}
        <div className="flex justify-center items-center p-8">
          <h1 className="text-5xl text-blue-600">
            呼<span className="text-white">ぶ</span>
          </h1>
        </div>
        {/* Register/Login Form */}
        <Register mode={"register"} />
        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center mt-6 mb-6">
          <span className="absolute bg-black text-white px-4 text-sm font-medium">
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
          <p className="text-white mt-12">
            You’re already famous here -
            <span className="text-blue-800"> Sign in!</span>
          </p>
        </div>
      </div>
    </div>
  );
};
