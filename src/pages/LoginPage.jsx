import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGIN_BASE_URL } from "../../constants/url.constant";

function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await axios.post(AUTH_LOGIN_BASE_URL, {
      username,
      password,
    });

    const { token } = response.data;

    // localStorage
    localStorage.setItem("jwt", token);
    navigate("/product");
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
