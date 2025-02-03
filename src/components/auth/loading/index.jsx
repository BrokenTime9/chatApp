import axios from "axios";
import { useEffect } from "react";

const Loading = ({ url }) => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  const exchangeCodeForToken = async (code) => {
    const resp = await axios.post(
      `${url}/api/auth/google${state}`,
      { code, state },
      { withCredentials: true },
    );

    if (resp?.data?.redirectTo) {
      window.location.href = "/dashboard";
    }
  };
  useEffect(() => {
    if (code) exchangeCodeForToken(code);
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
