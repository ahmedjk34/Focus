import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigation = useNavigate();
  setTimeout(() => {
    navigation("/");
  }, 2500);
  return (
    <div className="errorPage">
      <div className="error">
        <h1>404</h1>
        <h3>Page not Found</h3>
        <h5>Please make sure that you entered the correct url</h5>
        <br></br>
        <h6>Redirecting in a few seconds</h6>
      </div>
    </div>
  );
}

export default ErrorPage;
