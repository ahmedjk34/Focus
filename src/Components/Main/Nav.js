import React from "react";
import logo from "../images/logo-light.png";
import { usersInfo } from "./Main";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseBasics";
//To-Do : add an onclick to the image that returns to the main page
function Nav() {
  return (
    <div className="nav">
      <img src={logo} className="logo"></img>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search"
      ></input>
      <div className="profileNav">
        <img src={auth.currentUser.photoURL} alt="pfp"></img>
        <h3>{auth.currentUser.displayName} </h3>
        <div className="dropDown">
          <a>Profile</a>
          <a onClick={(e) => signOut(auth)}>Sign out</a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
