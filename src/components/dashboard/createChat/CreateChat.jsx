import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UrlContext from "../../context/urlContext";
import { UserRoundPlus } from "lucide-react";
const CreateChat = ({ friend, formVisible }) => {
  const [user, setUser] = useState("");
  const { url } = useContext(UrlContext);
  const [friends, setFriends] = useState();
  useEffect(() => {
    fetch();
  }, [friend]);
  const fetch = async () => {
    const response = await axios.post(
      `${url}/api/users`,
      { username: friend },
      { withCredentials: true },
    );
    if (friend === "") {
      setFriends();
    } else {
      setFriends(response.data);
    }
    console.log(response);
  };

  const handleMap = (e, i) => {
    return (
      <div
        key={i}
        className="flex justify-between p-4 mb-1 bg-white text-black rounded-sm cursor-pointer"
      >
        <div className="text-lg font-semibold">{e.username}</div>
        <div
          className="p-2 text-blue-500 rounded-full hover:bg-blue-500 hover:text-blue-200"
          onClick={() => handleSubmit(e)}
        >
          <UserRoundPlus size={20} />
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    const response = await axios.post(
      `${url}/api/chat`,
      { owner2: e.username },
      { withCredentials: true },
    );

    formVisible();
  };

  return <>{friends ? friends.map(handleMap) : ""}</>;
};

export default CreateChat;
