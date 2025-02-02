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
      if (resp.data.redirectTo) {
        setShow(false);
      }

      console.log("this runs");
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

  const handleLogOut = () => {
    const res = axios.post(
      `${url}/api/auth/logout`,
      {},
      { withCredentials: true },
    );
    console.log(res);
    window.location.href = "/";
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
            <div className="flex h-[100%] min-h-96">
              {isChatVisible ? (
                <div
                  className=" bg-gray-800 text-white p-4  flex-col justify-between"
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
                      className="text-white font-semibold"
                      onClick={toggleFormVisibility}
                    >
                      ⫶
                    </h1>
                  </div>
                  <ShowChats />
                  <div
                    onClick={handleLogOut}
                    className="p-3 mt-3 mb-1 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer text-red-500 font-bold text-xl text-center"
                  >
                    Logout
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col flex-grow h-screen">
                {chatId.length > 1 ? (
                  <>
                    <ChatHeader
                      mobile={isMobile}
                      chat={isChatVisible}
                      chatVisibility={
                        isMobile ? toggleChatVisibility : undefined
                      }
                    />
                    <ShowMessages />
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
