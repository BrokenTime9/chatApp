import axios from "axios";
import React, { useEffect, useState } from "react";
import Chat from "./chat/Chat";

const ShowChats = ({ chatVisibility }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/getChats", {}, { withCredentials: true })
      .then((response) => {
        setChats(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error fetching chats", error.response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 bg-gray-800 rounded-lg overflow-y-auto no-scrollbar">
      <Chat
        loading={isLoading}
        chatArray={chats}
        chatVisibility={chatVisibility}
      />
    </div>
  );
};

export default ShowChats;
