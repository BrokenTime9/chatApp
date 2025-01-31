import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Chat from "./chat/Chat";
import UrlContext from "../../context/urlContext";

const ShowChats = ({ chatVisibility }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useContext(UrlContext);

  useEffect(() => {
    axios
      .post(`${url}/api/getChats`, {}, { withCredentials: true })
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
      <Chat loading={isLoading} chatArray={chats} />
    </div>
  );
};

export default ShowChats;
