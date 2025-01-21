import React from "react";
import AuthPage from "./components/auth/authPage/authPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="*" element={<div>Page not found 404</div>}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
