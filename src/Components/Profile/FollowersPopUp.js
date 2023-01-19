import React from "react";

function FollowersPopUp({ followers, close }) {
  return (
    <div className="popUp">
      {followers.map((follwer) => (
        <div>
          <img src={follwer.pfp}></img>
          <h4>{follwer.username}</h4>
        </div>
      ))}
      <button type="button" className="close" onClick={close}>
        Close
      </button>
    </div>
  );
}

export default FollowersPopUp;
