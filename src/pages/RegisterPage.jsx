import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.service";

function RegisterPage() {
  const navigate = useNavigate();

  async function hadnleRegister(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    const response = await api.post("/auth/register", {
      username,
      password,
      firstName,
      lastName,
    });

    const token = response.data.token;
    console.log(token);

    // localStorage
    localStorage.setItem("jwt", token);
    navigate("/product");
  }

  return (
    <form onSubmit={hadnleRegister}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
