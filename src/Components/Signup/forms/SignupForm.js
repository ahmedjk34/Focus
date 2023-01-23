import React, { useState } from "react";
import checkValidity from "./validation";
import { handleEmailSignup } from "../formLogic";
import { currentUsers } from "../../../App";
function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <label>
        Username :
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkValidity(currentUsers);
          }}
          type="text"
          minLength={3}
          maxLength={10}
          id="username"
          name="username"
          placeholder="Username"
          required
        ></input>
        <span></span>
      </label>
      <label>
        Email :
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            checkValidity(currentUsers);
          }}
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
          onChange={(e) => {
            setPassword(e.target.value);
            checkValidity(currentUsers);
          }}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          minLength={6}
          required
        ></input>
        <span></span>
      </label>
      <button
        id="formBtn"
        onClick={(e) => {
          let isValid = checkValidity(currentUsers);
          handleEmailSignup(e, username, email, password, isValid);
        }}
      >
        Signup
      </button>
    </>
  );
}

export default SignupForm;
