import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import IdContext from "../context/chatIdContext";
import UserContext from "../context/userContext";
import WsContext from "../context/wsContext";
import UrlContext from "../../context/urlContext";

const ShowMessages = ({ mob }) => {
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
        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-3`}
        key={i}
      >
        <div
          className={`bg-gradient-to-r bg-blue-500 text-white flex gap-2 w-auto inline-block p-3 rounded-lg max-w-[80%] break-words whitespace-pre-wrap`}
        >
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
    <div
      className={`${mob && chatId.length === 0 ? "hidden" : ""} flex-grow p-12 pb-0 overflow-y-auto bg-gray-700 shadow-md no-scrollbar`}
    >
      {!chatId || chatId.length === 0 ? (
        <div
          className={`${mob && chatId.length === 0 ? "hidden" : "flex"} items-center justify-center h-full text-center text-gray-400 font-semibold text-lg`}
        >
          <p>Click on a chat to show messages</p>
        </div>
      ) : !messages || messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-center text-gray-400 font-semibold text-lg">
          <p>No messages in this chat yet</p>
        </div>
      ) : (
        messages.map(handleMap)
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ShowMessages;
