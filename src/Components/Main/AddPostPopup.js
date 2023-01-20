import React from "react";
import { useState } from "react";
import { publishPost } from "../Post/postFunctionality";
function AddPostPopup({ setShowPopup }) {
  const [remaining, setRemaining] = useState(30);
  const [caption, setCaption] = useState("");
  const [imgToUpload, setImgToUpload] = useState(null);
  return (
    <div className="popUp">
      <div className="addCaption">
        <h2>Caption:</h2>
        <textarea
          name="caption"
          maxLength={30}
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
            setRemaining(30 - e.target.value.length);
          }}
        ></textarea>
        <h5 className="remainingLetters">{remaining}/30</h5>
      </div>
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
          publishPost(imgToUpload, caption);
          setShowPopup(false);
        }}
      >
        {" "}
        Post ✔
      </button>

      <button className="close" onClick={(e) => setShowPopup(false)}>
        Close
      </button>
    </div>
  );
}

export default AddPostPopup;
