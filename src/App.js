import React, { useState } from "react";
import AuthPage from "./components/auth/authPage/authPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import UrlContext from "./components/context/urlContext";
import NumContext from "./components/context/numContex";
import Loading from "./components/auth/loading";

const App = () => {
  //change
  const [num, setNum] = useState(1);
  const domain = [
    "http://localhost:5000",
    "https://chatappbackend-omj2.onrender.com",
  ];
  const [url, setUrl] = useState(domain[num]);

  return (
    <NumContext.Provider value={{ num }}>
      <UrlContext.Provider value={{ url }}>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />}></Route>
            <Route path="/" element={<AuthPage />}></Route>
            <Route path="*" element={<div>Page not found 404</div>}></Route>
            <Route path="/loading" element={<Loading url={url} />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </UrlContext.Provider>
    </NumContext.Provider>
  );
};

export default App;
