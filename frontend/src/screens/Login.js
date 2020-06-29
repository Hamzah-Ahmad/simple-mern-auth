import React, { useState } from "react";
import axios from "axios";

const Login = ({ loginFunc }) => {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("Hamzah@email.com");
  const [password, setPassword] = useState("12345");

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { email, password };
    body = JSON.stringify(body);
    axios
      .post("/auth/login", body, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        // console.log(res.data);
        loginFunc(res.data.token, res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });

    // setEmail("");
    // setPassword("");
  };
  return (
    <div>
      <h1>Login</h1>
      {error && <div>{error.msg}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
