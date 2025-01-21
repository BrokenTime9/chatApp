import React, { useState } from "react";
import { GoogleLoginButton } from "../googleAuth/google";
import Register from "../localAuth/register";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "register" ? "login" : "register"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-6 max-w-lg w-full p-6 bg-white rounded shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          {mode === "register" ? "Register" : "Login"}
        </h1>

        {/* Register/Login Form */}
        <Register mode={mode} />

        {/* Horizontal Line */}
        <div className="relative flex items-center justify-center">
          <span className="absolute bg-white px-3 text-gray-500 text-sm">
            OR
          </span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton mode={mode} />

        {/* Toggle Mode Button */}
        <button
          onClick={toggleMode}
          className="w-full py-2 px-4 bg-gray-800 text-white font-semibold rounded shadow hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
        >
          Switch to {mode === "register" ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
