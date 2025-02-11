import React, { useContext, useEffect, useState } from "react";
import IdContext from "../../context/chatIdContext";
import UserContext from "../../context/userContext";
import { Minimize2 } from "lucide-react";

const ChatHeader = ({ chat, chatVisibility, mobile }) => {
  const { chatId, setChatId } = useContext(IdContext);
  const { user } = useContext(UserContext);
  const [oppUser, setOppUser] = useState();

  const oppUserSetter = () => {
    if (chatId[1]) {
      if (chatId[1] === user) {
        return setOppUser(chatId[2]);
      }
      setOppUser(chatId[1]);
    }
  };

  const visible = () => {
    if (mobile) {
      if (chatVisibility) {
        setChatId([]);
      }
    }
  };
  useEffect(oppUserSetter, [chatId, user]);

  return (
    <div className="h-18 bg-white text-black flex justify-between p-4 font-semibold text-xl shadow-md">
      {oppUser && (
        <h1 className="self-center cursor-pointer hover:text-blue-500 transition duration-200">
          {oppUser}
        </h1>
      )}
      {mobile && (
        <h1
          className="text-red-500 font-semibold items-center"
          onClick={visible}
        >
          <Minimize2 strokeWidth={2.5} />
        </h1>
      )}
    </div>
  );
};

export default ChatHeader;
