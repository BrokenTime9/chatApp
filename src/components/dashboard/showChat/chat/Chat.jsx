import { useContext } from "react";
import IdContext from "../../context/chatIdContext";
import UserContext from "../../context/userContext";

const Chat = ({ loading, chatArray }) => {
  const { setChatId } = useContext(IdContext);
  const { user } = useContext(UserContext);
  return (
    <>
      {!loading ? (
        chatArray.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setChatId(chat._id)}
            className="flex items-center justify-between p-3 mb-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
          >
            {/* Owner 1 */}
            <div className="text-lg font-semibold text-gray-800">
              {user === chat.owner1.username
                ? chat.owner2.username
                : chat.owner1.username}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </>
  );
};

export default Chat;
