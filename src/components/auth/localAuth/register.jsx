import React, { useContext, useState } from "react";

import UrlContext from "../../context/urlContext";
import axios from "axios";

const Register = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { url } = useContext(UrlContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/auth/${mode}`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      if (response.data.redirectTo) {
        window.location.href = response.data.redirectTo;
      }
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.error("Error response", error);
        alert(`${mode} failed`);
      } else if (error.request) {
        console.error("request error", error.request);
      } else {
        console.error("error", error.message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" w-full bg-transparent rounded-lg">
      {/* Username Input */}
      <label>Username</label>{" "}
      <input
        type="text"
        id="username"
        className=" p-3 mt-1 mb-4 block w-full rounded-sm bg-gray-200 text-black font-semibold border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {/* Password Input */}
      <label>Password</label>{" "}
      <input
        type="password"
        id="password"
        className="mt-1 mb-4 p-3 block w-full rounded-sm bg-gray-200 text-black font-semibold border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-8 py-3 px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-sm shadow-xl hover:scale-105 transition-transform"
      >
        {mode === "register" ? "Sign Up" : "Sign in"}
      </button>
    </form>
  );
};
export default Register;
