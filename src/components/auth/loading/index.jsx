import axios from "axios";
import { useEffect } from "react";

const Loading = ({ url }) => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const exchangeCodeForToken = async (code) => {
    const resp = await axios.post(
      `${url}/api/auth/google`,
      { code },
      { withCredentials: true },
    );

    if (resp?.data?.redirectTo) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (code) exchangeCodeForToken(code);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
      <div className="flex justify-center items-center space-x-2">
        <div
          className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4 mx-auto"
          style={{ borderTopColor: "transparent" }}
        ></div>
        <span className="text-lg font-semibold">Loading...</span>
      </div>
      <p className="mt-4 text-gray-400">Please wait while we load your data</p>
    </div>
  );
};

export default Loading;
