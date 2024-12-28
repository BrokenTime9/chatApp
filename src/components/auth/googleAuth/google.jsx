import React from "react";
import styles from "./style.module.css";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/auth/callback";

export const GoogleLoginButton = () => {
  const loginWithGoogle = () => {
    const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const queryParams = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
    }).toString();

    window.location.href = `${GOOGLE_AUTH_URL}?${queryParams}`;
  };

  return (
    <button class={styles.loginBtn} onClick={loginWithGoogle}>
      Google
    </button>
  );
};
