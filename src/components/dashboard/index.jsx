import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowChats from "./showChat/ShowChat";
import CreateChat from "./createChat/CreateChat";
import ShowMessages from "./showMessages/ShowMessages";
import IdContext from "./context/chatIdContext";
import UserContext from "./context/userContext";
import SendMessage from "./showMessages/sendMessage/SendMessage";

const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [chatId, setChatId] = useState("");
  const [user, setUser] = useState("");

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
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <IdContext.Provider value={{ chatId, setChatId }}>
        <div className="flex h-screen">
          <div className="w-96 bg-gray-800 text-white p-4 flex flex-col">
            <div className="flex flex-row text-xl font-semibold mb-5 justify-between">
              <h1>Chats</h1>
              <h1 className="text-blue-400">{user ? user : ""}</h1>
            </div>
            <ShowChats />
          </div>
          <div className="flex flex-col h-screen">
            <ShowMessages />
            <SendMessage />
          </div>
          <button
            onClick={toggleFormVisibility}
            className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-3xl">+</span>
          </button>
          {/* Create Chat form (only visible when isFormVisible is true) */}
          {isFormVisible && <CreateChat />}{" "}
        </div>
      </IdContext.Provider>
    </UserContext.Provider>
  );
};

export default Dashboard;
