import React from "react";

function FollowingPopUp({ following, close }) {
  console.log(following);
  return (
    <div className="popUp">
      {following.map((following) => (
        <div>
          <img src={following.pfp}></img>
          <h4>{following.username}</h4>
        </div>
      ))}
      <button type="button" className="close" onClick={close}>
        Close
      </button>
    </div>
  );
}

export default FollowingPopUp;
