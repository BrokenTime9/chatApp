import React, { useContext, useState } from "react";
import axios from "axios";
import IdContext from "../../context/chatIdContext";
import WsContext from "../../context/wsContext";
import UserContext from "../../context/userContext";
import UrlContext from "../../../context/urlContext";
import { Send } from "lucide-react";
const SendMessage = () => {
  const [context, setContext] = useState("");
  const { chatId } = useContext(IdContext);
  const { ws } = useContext(WsContext);
  const { user } = useContext(UserContext);
  const { url } = useContext(UrlContext);

  const adjustHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    console.log(e);
    const messagData = {
      content: context,
      owner: { username: user },
      chatId: chatId[0],
      timestamp: Date.now(),
    };

    setContext("");

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(messagData));
    } else {
      console.error("Socket closed");
    }

    try {
      const response = await axios.post(
        `${url}/api/message`,
        {
          content: context,
          chatId: chatId[0],
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (e) {
      if (e) {
        console.error(e);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (context.length > 0) {
        handleSubmit();
      }
    }
  };

  return (
    <div className="bg-white h-24 p-4 flex items-center justify-center shadow-md">
      <form
        className="flex items-center align-center w-[95%]"
        onSubmit={handleSubmit}
      >
        <textarea
          className="bg-gray-200 text-black w-full rounded-lg p-3 resize-none overflow-hidden no-scrollbar focus:outline-none"
          onChange={(e) => setContext(e.target.value)}
          onInput={adjustHeight}
          value={context}
          required
          rows={1}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          style={{
            minHeight: "40px",
            maxHeight: "80px",
            overflowY: "auto",
          }}
        />
        <button
          type="submit"
          className="text-white p-3 rounded-lg text-lg font-semibold ml-3 bg-blue-500"
        >
          <Send />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
