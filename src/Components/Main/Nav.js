import React from "react";
import logo from "../images/logo-light.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseBasics";
import { useState } from "react";
import AddPostPopup from "./AddPostPopup";
import searchFun from "./searchFunctionality";
import SearchPopup from "./SearchPopup";
import { Link, useNavigate } from "react-router-dom";
function Nav() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [matchingUsers, setMatchingUsers] = useState([]);
  const navigation = useNavigate();
  return (
    <div className="nav">
      {showPopup && <AddPostPopup setShowPopup={setShowPopup}></AddPostPopup>}
      <div className="mobileContainer">
        <img src={logo} className="logo" onClick={() => navigation("/")}></img>
        <div className="profileNav mobile">
          <img src={auth.currentUser.photoURL} alt="pfp"></img>
          <h3>{auth.currentUser.displayName} </h3>
          <div className="dropDown">
            <Link to={`/profile/${auth.currentUser.displayName}`}>Profile</Link>
            <a onClick={(e) => setShowPopup(true)}>Add a post</a>
            <a onClick={(e) => signOut(auth)}>Sign out</a>
          </div>
        </div>
      </div>
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
        {showSearchPopup && (
          <SearchPopup
            matchingUsers={matchingUsers}
            setShowPopup={setShowSearchPopup}
          />
        )}
      </div>
      <div className="profileNav desktop">
        <img src={auth.currentUser.photoURL} alt="pfp"></img>
        <h3>{auth.currentUser.displayName} </h3>
        <div className="dropDown">
          <a
            onClick={(e) => {
              navigation(`/profile/${auth.currentUser.displayName}`);
            }}
          >
            Profile
          </a>
          <a onClick={(e) => setShowPopup(true)}>Add a post</a>
          <a
            onClick={(e) => {
              signOut(auth);
              navigation("/");
            }}
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
