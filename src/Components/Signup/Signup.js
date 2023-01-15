import React from "react";
import Sidebar from "./Sidebar";
import Form from "./Form";

function Signup({ currentUsers }) {
  return (
    <div className="signupPage">
      <Sidebar></Sidebar>
      <Form currentUsers={currentUsers}></Form>
    </div>
  );
}

export default Signup;
