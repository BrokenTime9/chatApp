import { useContext, useEffect, useRef } from "react";
import IdContext from "../../context/chatIdContext";
import UserContext from "../../context/userContext";
import WsContext from "../../context/wsContext";
import NumContext from "../../../context/numContex";

const Chat = ({ loading, chatArray }) => {
  const { setChatId, chatId } = useContext(IdContext);
  const { user } = useContext(UserContext);
  const { ws, setWs } = useContext(WsContext);
  const { num } = useContext(NumContext);
  const wsRef = useRef(null);
  const domain = [
    "ws://localhost:5000",
    "wss://chatappbackend-omj2.onrender.com",
  ];

  const handleClick = (chat) => {
    setChatId([chat._id, chat.owner1.username, chat.owner2.username]);
  };

  useEffect(() => {
    if (chatId.length > 0) {
      if (wsRef.current) {
        wsRef.current.close();
      }

      //#2 to change
      const newWs = new WebSocket(`${domain[num]}?chatId=${chatId[0]}`);

      newWs.onopen = () => {
        wsRef.current = newWs;
        setWs(newWs);
      };
      newWs.onmessage = (event) => {
        console.log("New message:", event.data);
      };

      return () => {
        newWs.close();
      };
    }
  }, [chatId, setWs]);
  return (
    <>
      {!loading ? (
        chatArray.map((chat, i) => (
          <div
            key={i}
            onClick={() => handleClick(chat)}
            className="flex items-center justify-between p-4 mb-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 cursor-pointer"
          >
            {/* Owner 1 */}
            <div className="text-lg font-semibold">
              {user === chat.owner1.username
                ? chat.owner2.username
                : chat.owner1.username}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </>
  );
};

export default Chat;
