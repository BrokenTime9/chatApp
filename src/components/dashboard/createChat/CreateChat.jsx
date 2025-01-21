import React, { useState } from "react";
import axios from "axios";

const CreateChat = () => {
  const [user, setUser] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        {
          owner2: user,
        },
        { withCredentials: true },
      );
      console.log(response);
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 z-10"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create a Chat</h2>

      <input
        id="username"
        type="text"
        placeholder="Receiver's username"
        onChange={(e) => setUser(e.target.value)}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Chat
      </button>
    </form>
  );
};

export default CreateChat;
