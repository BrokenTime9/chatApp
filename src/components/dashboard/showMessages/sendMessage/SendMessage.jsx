import React, { useContext, useState } from "react";
import axios from "axios";
import IdContext from "../../context/chatIdContext";

const SendMessage = () => {
  const [context, setContext] = useState("");
  const { chatId } = useContext(IdContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("comes herer");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/message",
        {
          content: context,
          chatId,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setContext(e.target.value);
          }}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
