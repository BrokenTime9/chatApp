import React, { useState } from "react";
import { GoogleLoginButton } from "../googleAuth/google";
import Register from "../localAuth/register";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "register" ? "login" : "register"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="space-y-6 max-w-sm w-full p-6 bg-gray-500 rounded-lg shadow">
        <h1 className="text-center text-4xl text-white font-bold">
          <h1>
            Yo<span className="text-blue-400 ">bu</span>
          </h1>
        </h1>

        {/* Register/Login Form */}
        <Register mode={mode} />
        <button
          onClick={toggleMode}
          className="w-full py-2 px-2  bg-white text-blue-500 font-bold rounded shadow focus:outline-none "
        >
          {mode === "register" ? "Login" : "Register"}
        </button>

        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center">
          <span className="absolute bg-gray-500 text-white px-3 text-gray-500 text-sm">
            OR
          </span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton mode={mode} />

        {/* Toggle Mode Button */}
      </div>
    </div>
  );
};

export default AuthPage;
