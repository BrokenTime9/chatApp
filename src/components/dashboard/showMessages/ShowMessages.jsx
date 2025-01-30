import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import IdContext from "../context/chatIdContext";
import UserContext from "../context/userContext";
import WsContext from "../context/wsContext";

const ShowMessages = () => {
  const { chatId } = useContext(IdContext);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const { ws } = useContext(WsContext);

  const handleMap = (e, i) => {
    return (
      <div
        className={`flex ${e.owner.username === user ? "justify-end" : "justify-start"} mb-2`}
        key={i}
      >
        <p className="bg-blue-500 text-white w-auto inline-block p-2 rounded-lg max-w-[80%] break-words whitespace-pre-wrap overflow-y-auto">
          {e.content}
        </p>
      </div>
    );
  };

  useEffect(() => {
    if (chatId[0]) {
      axios
        .get(`http://localhost:5000/api/messages/${chatId[0]}`)
        .then((data) => {
          setMessages(data.data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [chatId]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.chatId === chatId[0]) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    return () => {
      ws.onclose = () => console.log("WebSocket disconnected");
    };
  }, [chatId, user, ws]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex-grow h-[90%] p-4 overflow-y-auto no-scrollbar">
      {chatId === ""
        ? "Click on a chat to show messages"
        : !messages || messages.length === 0
          ? "No messages in this chat yet"
          : messages.map(handleMap)}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ShowMessages;
