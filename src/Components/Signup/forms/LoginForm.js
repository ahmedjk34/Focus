import React from "react";

function LoginForm() {
  return (
    <>
      <label>
        Email :
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        ></input>
      </label>
      <label>
        Password :
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        ></input>
      </label>
      <button>Signup</button>
    </>
  );
}

export default LoginForm;
