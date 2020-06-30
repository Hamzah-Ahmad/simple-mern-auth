import React, { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const loginFunc = (tokenArg, userArg) => {
    setLoggedIn(true);
    setToken(tokenArg);
    setUser(userArg);
    localStorage.setItem(
      "userData",
      JSON.stringify({ user: userArg, token: tokenArg })
    );
  };

  const logoutFunc = () => {
    setLoggedIn(false);
    setToken("");
    setUser("");
    localStorage.removeItem("userData");
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, loginFunc, logoutFunc }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
