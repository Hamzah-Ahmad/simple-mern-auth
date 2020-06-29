import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
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

  const protectedRouteRequest = () => {
    axios
      .get("/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      loginFunc(storedData.token, storedData.user);
    }
  }, []);

  return (
    <div className="App">
      <h1>Mern Auth</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Register loginFunc={loginFunc} />
        <Login loginFunc={loginFunc} />
      </div>
      {isLoggedIn ? (
        <div>
          <h1 style={{ marginTop: 100 }}>{user.name} is logged in</h1>
          <div>Their token begins with {token.substring(0, 15)}......</div>
          <div style={{ marginTop: 20 }}></div>
          <button onClick={logoutFunc}>Logout</button>
        </div>
      ) : (
        <h1>Login to see user infomation</h1>
      )}
      <button onClick={protectedRouteRequest}>Protected Route</button>
    </div>
  );
}

export default App;
