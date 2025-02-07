import React, { useState, useEffect } from "react";
import AuthPage from "./components/auth/authPage/authPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import UrlContext from "./components/context/urlContext";
import NumContext from "./components/context/numContex";
import Loading from "./components/auth/loading";
import MobileContext from "./components/dashboard/context/mobileWidth";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //change
  const [num, setNum] = useState(1);
  const domain = [
    "http://localhost:5000",
    "https://chatappbackend-omj2.onrender.com",
  ];
  const [url, setUrl] = useState(domain[num]);

  return (
    <MobileContext.Provider value={{ isMobile }}>
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
    </MobileContext.Provider>
  );
};

export default App;
