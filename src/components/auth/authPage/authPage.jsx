import React, { useState } from "react";
import { GoogleLoginButton } from "../googleAuth/google";
import Register from "../localAuth/register";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "register" ? "login" : "register"));
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] w-screen bg-gradient-to-r from-gray-600 to-gray-400">
      <div className="max-w-sm w-full p-6 bg-gray-500 rounded-lg shadow-lg">
        {/* Header: Logo and Button with offset effect */}
        <div className="flex items-center justify-between mb-6 relative">
          <h1 className="text-5xl text-white font-extrabold transform -translate-y-1">
            Yo<span className="text-blue-400">bu</span>
          </h1>
          <button
            onClick={toggleMode}
            className="px-5 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-xl hover:scale-105 transition transform"
          >
            {mode === "register" ? "Login" : "Register"}
          </button>
        </div>

        {/* Register/Login Form */}
        <Register mode={mode} />

        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center my-6">
          <span className="absolute bg-gray-500 text-white px-4 text-sm font-medium">
            OR
          </span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton mode={mode} />
      </div>
    </div>
  );
};

export default AuthPage;
