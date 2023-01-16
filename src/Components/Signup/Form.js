import React, { useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import googleLogo from "../images/google.svg";
import { currentUsers } from "../../App";
import checkValidity from "./forms/validation";
function Form({ currentUsers }) {
  const [showSignup, setShowSignup] = useState(true);
  useEffect(() => checkValidity(currentUsers), []);
  return (
    <div className="formHolder">
      <form noValidate>
        <div className="buttonsHolder">
          <button type="button" onClick={() => setShowSignup(true)}>
            Signup Form
          </button>
          <button type="button" onClick={() => setShowSignup(false)}>
            Login Form
          </button>
        </div>
        {showSignup ? <SignupForm /> : <LoginForm />}
        <button type="button" id="googleLogin">
          <img src={googleLogo}></img>
        </button>
      </form>
    </div>
  );
}

export default Form;
