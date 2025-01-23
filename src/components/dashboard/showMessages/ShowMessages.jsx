import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import IdContext from "../context/chatIdContext";

const ShowMessages = () => {
  const { chatId } = useContext(IdContext);
  const [messages, setMessages] = useState([]);

  const handleMap = (e, i) => {
    return <p key={i}>{e.content}</p>;
  };

  useEffect(() => {
    if (chatId) {
      axios
        .get(`http://localhost:5000/api/messages/${chatId}`)
        .then((data) => {
          console.log(data);
          setMessages(data.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [chatId]);
  return (
    <div className="flex-grow">
      {chatId === ""
        ? "Click on a chat to show messages"
        : !messages || messages.length === 0
          ? "No messages in this chat yet"
          : messages.map(handleMap)}
    </div>
  );
};

export default ShowMessages;
