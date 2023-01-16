import React from "react";
import { useState } from "react";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <label>
        Email :
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        ></input>
        <span></span>
      </label>
      <label>
        Password :
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          minLength={6}
          placeholder="Password"
          required
        ></input>
        <span></span>
      </label>
      <button id="formBtn">Login</button>
    </>
  );
}

export default LoginForm;
