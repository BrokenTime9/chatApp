import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UrlContext from "../../context/urlContext";
import { UserRoundPlus } from "lucide-react";
const CreateChat = ({ friend }) => {
  const [user, setUser] = useState("");
  const { url } = useContext(UrlContext);
  const [friends, setFriends] = useState();
  useEffect(() => {
    fetch();
  }, [friend]);
  const fetch = async () => {
    const response = await axios.get(`${url}/api/users`, {
      params: { username: friend },
    });
    if (friend === "") {
      setFriends();
    } else {
      setFriends(response.data);
    }
  };

  const handleMap = (e, i) => {
    return (
      <div
        key={i}
        className="flex justify-between p-4 mb-1 bg-white text-black rounded-sm cursor-pointer"
      >
        <div className="text-lg font-semibold">{e.username}</div>
        <div className="p-2 text-blue-500 rounded-full hover:bg-blue-500 hover:text-blue-200">
          <UserRoundPlus size={20} />
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {};

  return <>{friends ? friends.map(handleMap) : ""}</>;
};

export default CreateChat;
