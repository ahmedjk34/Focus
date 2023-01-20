import React from "react";
import logo from "../images/logo-light.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseBasics";
import { useState } from "react";
import AddPostPopup from "./AddPostPopup";
import searchFun from "./searchFunctionality";
import SearchPopup from "./SearchPopup";
import { useNavigate } from "react-router-dom";
//To-Do : add an onclick to the image that returns to the main page
function Nav() {
  const navigation = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  return (
    <div className="nav">
      {showPopup && <AddPostPopup setShowPopup={setShowPopup}></AddPostPopup>}
      <img
        src={logo}
        className="logo"
        onClick={() => navigation("/focus")}
      ></img>
      <div className="searchHolder">
        <input
          type="search"
          name="search"
          id="search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (e.target.value) setShowSearchPopup(true);
            else setShowSearchPopup(false);
            searchFun(e.target.value, setMatchingUsers);
          }}
          placeholder="Search"
        ></input>
        {showSearchPopup && <SearchPopup matchingUsers={matchingUsers} />}
      </div>
      <div className="profileNav">
        <img src={auth.currentUser.photoURL} alt="pfp"></img>
        <h3>{auth.currentUser.displayName} </h3>
        <div className="dropDown">
          <a>Profile</a>
          <a onClick={(e) => setShowPopup(true)}>Add a post</a>
          <a onClick={(e) => signOut(auth)}>Sign out</a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
