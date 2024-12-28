import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/${mode}`,
        {
          username,
          password,
        },
      );
      if (response.status === 201) {
        console.log(`${mode} successful`, response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response", error.response.data);
        alert(`${mode} failed`);
      } else if (error.request) {
        console.error("request error", error.request);
      } else {
        console.error("error", error.message);
      }
    }
  };
  return (
    <>
      <p
        onClick={() => {
          mode === "register" ? setMode("login") : setMode("register");
        }}
      >
        {mode}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{mode}</button>
      </form>
    </>
  );
};

export default Register;
