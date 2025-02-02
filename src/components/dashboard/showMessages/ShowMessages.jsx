import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import IdContext from "../context/chatIdContext";
import UserContext from "../context/userContext";
import WsContext from "../context/wsContext";
import UrlContext from "../../context/urlContext";

const ShowMessages = () => {
  const { chatId } = useContext(IdContext);
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const { ws } = useContext(WsContext);
  const { url } = useContext(UrlContext);

  const handleMap = (e, i) => {
    const isCurrentUser = e.owner.username === user;
    const date = new Date(e.timestamp);

    const options = { hour: "2-digit", minute: "2-digit" };
    const timeString = date.toLocaleTimeString([], options);

    return (
      <div
        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
        key={i}
      >
        <div className="bg-blue-500 text-white flex gap-2 w-auto inline-block p-2 rounded-lg max-w-[80%] break-words whitespace-pre-wrap overflow-y-auto">
          <p className="pt-1">{e.content}</p>

          <p className={`text-xs text-white text-right pt-4`}>{timeString}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (chatId[0]) {
      axios
        .post(
          `${url}/api/messages`,
          { chatId: chatId[0] },
          { withCredentials: true },
        )
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
