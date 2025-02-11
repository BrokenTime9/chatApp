import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Chat from "./chat/Chat";
import UrlContext from "../../context/urlContext";
import CreateChat from "../createChat/CreateChat";

const ShowChats = ({ addF, friend, formVisible }) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useContext(UrlContext);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const response = await axios
      .post(`${url}/api/getChats`, {}, { withCredentials: true })
      .then((response) => {
        setChats(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error fetching chats", error.response);
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full flex-grow overflow-y-auto no-scrollbar">
      {addF ? <CreateChat friend={friend} formVisible={formVisible} /> : ""}
      {!addF ? <Chat loading={isLoading} chatArray={chats} /> : ""}
    </div>
  );
};

export default ShowChats;
