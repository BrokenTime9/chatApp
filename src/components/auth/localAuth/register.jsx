import React, { useState } from "react";
import axios from "axios";

const Register = ({ mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${mode}`,
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-gray-50 rounded shadow"
    >
      <input
        type="text"
        id="username"
        className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        id="password"
        className="mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {mode === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};
export default Register;
