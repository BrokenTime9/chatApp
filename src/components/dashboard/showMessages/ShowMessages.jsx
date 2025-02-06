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

  const handleMap = (e, i, messages) => {
    const isCurrentUser = e.owner.username === user;
    const date = new Date(e.timestamp);
    console.log(e);

    const options = { hour: "2-digit", minute: "2-digit" };
    const timeString = date.toLocaleTimeString([], options);
    const currentOwner = e.owner.username;
    if (messages[i - 1]) {
      const prevOwner = messages[i - 1].owner.username;
    }

    return (
      <div
        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
        key={i}
      >
        <div
          className={`relative bg-gradient-to-r bg-blue-500 text-white flex gap-2 w-auto inline-block pt-2 pl-3 pb-4 pr-11 rounded-lg max-w-full break-words whitespace-pre-wrap break-words break-all`}
        >
          {
            <div class="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-blue-500 border-r-blue-500"></div>
          }
          <p className="pt-1">{e.content}</p>

          <p className={`text-xs text-white absolute right-2 bottom-1`}>
            {timeString}
          </p>
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
      className={`${mob && chatId.length === 0 ? "hidden" : ""} flex-grow p-8  pb-0 overflow-y-auto bg-gray-700 shadow-md no-scrollbar`}
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
