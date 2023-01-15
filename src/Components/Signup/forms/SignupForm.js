import React from "react";

function SignupForm() {
  return (
    <>
      <label>
        Username :
        <input
          type="text"
          min={3}
          max={10}
          id="username"
          name="username"
          placeholder="Username"
          required
        ></input>
      </label>
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

export default SignupForm;
