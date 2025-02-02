import React, { useState } from "react";
import AuthPage from "./components/auth/authPage/authPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import UrlContext from "./components/context/urlContext";

const App = () => {
  const domain = [
    "http://localhost:5000",
    "https://chatappbackend-omj2.onrender.com",
  ];
  //#1 to change
  const [url, setUrl] = useState(domain[0]);

  return (
    <UrlContext.Provider value={{ url }}>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/" element={<AuthPage />}></Route>
          <Route path="*" element={<div>Page not found 404</div>}></Route>

          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </UrlContext.Provider>
  );
};

export default App;
