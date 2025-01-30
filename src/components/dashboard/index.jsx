import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowChats from "./showChat/ShowChat";
import ChatHeader from "./showChat/chatHeader/ChatHeader";
import CreateChat from "./createChat/CreateChat";
import ShowMessages from "./showMessages/ShowMessages";
import IdContext from "./context/chatIdContext";
import UserContext from "./context/userContext";
import SendMessage from "./showMessages/sendMessage/SendMessage";
import WsContext from "./context/wsContext";

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatId, setChatId] = useState([]);
  const [user, setUser] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [ws, setWs] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 426);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 426);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/user", {}, { withCredentials: true })
      .then((data) => {
        setUser(data.data.username);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
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
          <div className="flex h-[100%] min-h-96">
            {isChatVisible ? (
              <div
                className="bg-gray-800 text-white p-4  flex-col"
                style={{
                  width: isMobile ? "100vw" : "24rem",
                  display: isMobile ? "block" : "flex",
                  zIndex: "1",
                }}
              >
                <div className="flex flex-row text-xl font-semibold mb-5 justify-between">
                  <h1 onClick={toggleChatVisibility}>Chats</h1>
                  <h1
                    className="text-white font-semibold"
                    onClick={toggleFormVisibility}
                  >
                    ⫶
                  </h1>
                </div>
                <ShowChats chatVisibility={toggleChatVisibility} />
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col flex-grow h-screen">
              {chatId.length > 1 ? (
                <>
                  <ChatHeader
                    chat={isChatVisible}
                    chatVisibility={toggleChatVisibility}
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
        </WsContext.Provider>
      </IdContext.Provider>
    </UserContext.Provider>
  );
};

export default Dashboard;
