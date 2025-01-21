import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import IdContext from "../context/chatIdContext";

const ShowMessages = () => {
  const { chatId } = useContext(IdContext);
  const [messages, setMessages] = useState([]);
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
  return <p>{messages[0]?.content}</p>;
};

export default ShowMessages;
