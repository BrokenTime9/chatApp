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
import { UserPlus, LogOut, Ellipsis } from "lucide-react";

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatId, setChatId] = useState([]);
  const [user, setUser] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [style, setStyle] = useState(false);
  const [ws, setWs] = useState("");
  const { url } = useContext(UrlContext);
  const { isMobile } = useContext(MobileContext);
  const [addFriend, setAddFriend] = useState("");

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

  const toggleStyle = () => {
    setStyle((prevState) => !prevState);
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
                    <div
                      className={`p-1 flex flex-col items-center  ${style ? "bg-blue-500 text-white" : "bg-white text-blue-500"} rounded-lg cursor-pointer relative`}
                      onClick={toggleStyle}
                    >
                      <Ellipsis />
                      {style && (
                        <div className="absolute top-full -translate-x-6 bg-gray-100 text-black rounded-sm shadow-lg">
                          <div
                            className="p-2 hover:bg-green-200 text-sm flex justify-between"
                            onClick={handleAdd}
                          >
                            <p>Add</p>
                            <UserPlus size={20} className="text-green-500" />
                          </div>
                          <div
                            className="p-2 hover:bg-red-200 text-sm flex justify-between gap-2"
                            onClick={handleLogOut}
                          >
                            <p>Logout</p>
                            <LogOut size={20} className="text-red-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    className="p-4 mb-2 bg-gray-200 rounded-full"
                    placeholder="search"
                    onChange={
                      isFormVisible
                        ? (e) => {
                            setAddFriend(e.target.value);
                          }
                        : null
                    }
                  />
                  <ShowChats
                    addF={isFormVisible}
                    friend={addFriend}
                    formVisible={handleAdd}
                  />
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
