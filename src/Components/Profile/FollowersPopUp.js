import React from "react";

function FollowersPopUp({ followers, close }) {
  return (
    <div className="popUp">
      {followers.map((follower) => (
        <div>
          <img src={follower.pfp}></img>
          <h4>{follower.username}</h4>
        </div>
      ))}
      <button type="button" className="close" onClick={close}>
        Close
      </button>
    </div>
  );
}

export default FollowersPopUp;
