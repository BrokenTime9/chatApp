import React, { useContext, useState } from "react";
import axios from "axios";
import IdContext from "../../context/chatIdContext";

const SendMessage = () => {
  const [context, setContext] = useState("");
  const { chatId } = useContext(IdContext);

  const adjustHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
    <div className="bg-gray-800 h-24 flex items-center justify-center">
      <form className="flex items-center w-[95%]" onSubmit={handleSubmit}>
        <textarea
          className="w-full max-h-48 rounded-lg p-2 resize-none overflow-hidden"
          onChange={(e) => setContext(e.target.value)}
          onInput={adjustHeight}
          value={context}
          required
          rows={1}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="text-white text-xl font-semibold ml-3 hover:text-blue-400 duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
