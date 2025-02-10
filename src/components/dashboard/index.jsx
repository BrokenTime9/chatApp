import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShowChats from "./showChat/ShowChat";
import ChatHeader from "./showChat/chatHeader/ChatHeader";
import ShowMessages from "./showMessages/ShowMessages";
import IdContext from "./context/chatIdContext";
import UserContext from "./context/userContext";
import SendMessage from "./showMessages/sendMessage/SendMessage";
import WsContext from "./context/wsContext";
import UrlContext from "../context/urlContext";
import MobileContext from "./context/mobileWidth";

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatId, setChatId] = useState([]);
  const [user, setUser] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [ws, setWs] = useState("");
  const { url } = useContext(UrlContext);
  const { isMobile } = useContext(MobileContext);

  useEffect(() => {
    const checkLogin = async () => {
      const resp = await axios.post(
        `${url}/api/auth/checkLogin`,
        {},
        { withCredentials: true },
      );
      if (resp?.data?.redirectTo) {
        window.location.href = "/signin";
      }
    };

    checkLogin();
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
      window.location.href = res.data.redirectTo;
    }
  };
  const handleAdd = () => {
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
            <div className="flex min-h-[100dvh] max-h-[100dvh] w-screen">
              {isChatVisible ? (
                <div
                  className="bg-white text-black p-6 pb-4 flex-col justify-between shadow-lg"
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
                  <div className="flex justify-between text-2xl font-semibold mb-5">
                    <div className="flex">
                      <h1>Hello &nbsp; </h1>
                      <h1 className="text-blue-500">{user}&#x1F44B;</h1>
                    </div>
                    <div>+</div>
                  </div>
                  <input
                    className="p-4 mb-2 flex-grow bg-gray-200 rounded-full"
                    placeholder="search"
                  />
                  <ShowChats addF={isFormVisible} />
                  <div
                    onClick={handleAdd}
                    className="p-3 mt-3 mb-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer text-center text-xl font-semibold"
                  >
                    Add friend
                  </div>

                  <div
                    onClick={handleLogOut}
                    className="p-3 mt-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 cursor-pointer text-center text-xl font-semibold"
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
