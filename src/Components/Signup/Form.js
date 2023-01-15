import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

function Form({ currentUsers }) {
  const [showSignup, setShowSignup] = useState(true);
  return (
    <div className="formHolder">
      <form>
        <div className="buttonsHolder">
          <button type="button" onClick={() => setShowSignup(true)}>
            Signup
          </button>
          <button type="button" onClick={() => setShowSignup(false)}>
            Login
          </button>
        </div>
        {showSignup ? <SignupForm /> : <LoginForm />}
        <button>Google</button>
      </form>
    </div>
  );
}

export default Form;
