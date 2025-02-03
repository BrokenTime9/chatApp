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
        console.log(response.data.redirectTo);
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-gray-500 rounded "
    >
      <input
        type="text"
        id="username"
        className="mt-1 p-2 block w-full rounded bg-white text-black font-semibold border-gray-500 shadow-sm focus:outline-none"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        id="password"
        className="mt-1 p-2 block w-full rounded bg-white text-black font-semibold border-gray-300 shadow-sm focus:outline-none"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-white text-blue-500 font-bold rounded shadow "
      >
        {mode === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};
export default Register;
