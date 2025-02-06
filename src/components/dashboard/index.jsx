import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShowChats from "./showChat/ShowChat";
import ChatHeader from "./showChat/chatHeader/ChatHeader";
import CreateChat from "./createChat/CreateChat";
import ShowMessages from "./showMessages/ShowMessages";
import IdContext from "./context/chatIdContext";
import UserContext from "./context/userContext";
import SendMessage from "./showMessages/sendMessage/SendMessage";
import WsContext from "./context/wsContext";
import UrlContext from "../context/urlContext";

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatId, setChatId] = useState([]);
  const [user, setUser] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [ws, setWs] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const { url } = useContext(UrlContext);

  useEffect(() => {
    const checkLogin = async () => {
      const resp = await axios.post(
        `${url}/api/auth/checkLogin`,
        {},
        { withCredentials: true },
      );
      if (resp?.data?.redirectTo) {
        window.location.href = "/";
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .post(`${url}/api/user`, {}, { withCredentials: true })
      .then((data) => {
        setUser(data.data.username);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleLogOut = async () => {
    const res = await axios.post(
      `${url}/api/auth/logout`,
      {},
      { withCredentials: true },
    );

    if (res?.data?.redirectTo) {
      window.location.href = "/";
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };
  const toggleChatVisibility = () => {
    setIsChatVisible((prevState) => !prevState);
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <IdContext.Provider value={{ chatId, setChatId }}>
        <WsContext.Provider value={{ ws, setWs }}>
          {show ? (
            <div className="flex h-screen w-screen">
              {isChatVisible ? (
                <div
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6 flex-col justify-between shadow-lg"
                  style={{
                    width: isMobile
                      ? !chatId.length > 0
                        ? "100vw"
                        : "0"
                      : "24rem",
                    display: isMobile
                      ? !chatId.length > 0
                        ? "flex"
                        : "none"
                      : "flex",
                  }}
                >
                  <div className="flex flex-row text-xl font-semibold mb-5 justify-between">
                    <h1>Chats</h1>
                    <h1
                      className="text-white font-semibold cursor-pointer"
                      onClick={toggleFormVisibility}
                    >
                      ⫶
                    </h1>
                  </div>
                  <ShowChats />
                  <div
                    onClick={handleLogOut}
                    className="p-3 mt-3 mb-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 cursor-pointer text-center text-xl font-semibold"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col  flex-grow bg-gray-100 rounded-lg shadow-lg">
                {chatId.length > 1 ? (
                  <>
                    <ChatHeader
                      mobile={isMobile}
                      chat={isChatVisible}
                      chatVisibility={
                        isMobile ? toggleChatVisibility : undefined
                      }
                    />
                  </>
                ) : (
                  ""
                )}
                <ShowMessages mob={isMobile} />
                {chatId.length > 1 ? (
                  <>
                    <SendMessage />
                  </>
                ) : (
                  ""
                )}
              </div>
              {isFormVisible && <CreateChat />}
            </div>
          ) : (
            ""
          )}
        </WsContext.Provider>
      </IdContext.Provider>
    </UserContext.Provider>
  );
};

export default Dashboard;
