import React from "react";
import Register from "./components/auth/localAuth/register";
import { GoogleLoginButton } from "./components/auth/googleAuth/google";

const App = () => {
  return (
    <div>
      <h1>User Authentication</h1>
      <Register />
      <p>or</p>
      <GoogleLoginButton />
    </div>
  );
};

export default App;
