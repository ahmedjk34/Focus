import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SearchPopup({ matchingUsers, setShowPopup }) {
  const navigation = useNavigate();
  return (
    <div className="searchPopup">
      {matchingUsers.map((user, index) =>
        index < 3 ? (
          <div
            key={index}
            onClick={(e) => {
              navigation(`/profile/${user.username}`);
              setShowPopup(false);
            }}
          >
            <img src={user.profilePicture}></img>
            <h3>{user.username}</h3>
          </div>
        ) : null
      )}
    </div>
  );
}

export default SearchPopup;
