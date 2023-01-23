import React from "react";
import { useState } from "react";
import { updateProfilePicture } from "./profileLogic";
function UpdateImgPopup({ setShowEdit, userId }) {
  const [imgToUpload, setImgToUpload] = useState(null);

  return (
    <div className="popUp changePfp">
      <label className="upload">
        Upload a Photo +
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImgToUpload(e.target.files[0])}
        ></input>
      </label>
      <button
        className="upload"
        onClick={(e) => {
          updateProfilePicture(imgToUpload, userId);
          setShowEdit(false);
        }}
      >
        Update
      </button>
      <button className="close" onClick={(e) => setShowEdit(false)}>
        Close
      </button>
    </div>
  );
}

export default UpdateImgPopup;
