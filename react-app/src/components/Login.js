import React, { useState } from "react";
import API from "../adapters/API";
import { Redirect } from "react-router-dom";

const Login = ({ onSuccess, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    API.login({ username, password })
      .then(user => onSuccess(user))
      .catch(errorPromise => {
        errorPromise.then(errorData => setErrors(errorData.errors));
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default Login;
