import React, { useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import googleLogo from "../images/google.svg";
import { currentUsers } from "../../App";
import checkValidity from "./forms/validation";
import { handleGoogle } from "./formLogic";
function Form() {
  const [showSignup, setShowSignup] = useState(true);
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
        {showSignup ? (
          <SignupForm currentUsers={currentUsers} />
        ) : (
          <LoginForm />
        )}
        <button type="button" id="googleLogin" onClick={(e) => handleGoogle(e)}>
          <img src={googleLogo}></img>
        </button>
      </form>
    </div>
  );
}

export default Form;
