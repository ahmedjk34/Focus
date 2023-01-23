import React from "react";
import { useState } from "react";
import { auth } from "../../firebaseBasics";
import { publishPost } from "../Post/postFunctionality";
import { useNavigate } from "react-router-dom";

function AddPostPopup({ setShowPopup }) {
  const [remaining, setRemaining] = useState(30);
  const [caption, setCaption] = useState("");
  const [imgToUpload, setImgToUpload] = useState(null);
  const navigation = useNavigate();

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
          const isValid = publishPost(imgToUpload, caption);
          isValid.then((valid) => {
            if (valid) navigation(`profile/${auth.currentUser.displayName}`);
          });
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
