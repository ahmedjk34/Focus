import React, { useEffect, useState } from "react";
import { UserInfo } from "firebase/auth";
import likeIcon from "../images/likeIcon.svg";
import commentIcon from "../images/commentIcon.svg";
import shareIcon from "../images/shareIcon.svg";
import { getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { postsRef } from "../../firebaseBasics";
import { handleLike } from "./postFunctionality";
function Post({ data }) {
  const {
    author,
    authorPfp,
    caption,
    comments: comments,
    date,
    id,
    img,
    likedUsers,
    likesCounter,
    url,
  } = data;
  const [currentLikes, setCurrentLikes] = useState(likesCounter);
  const [commentsArray, setCommentsArray] = useState(comments);
  const [likedUsersArray, setLikedUsersArray] = useState(likedUsers);
  const [docId, setDocId] = useState("");
  const [icon, setIcon] = useState(likeIcon);
  const currentPost = query(postsRef, where("id", "==", id));
  (function () {
    getDocs(currentPost).then((snapshot) =>
      snapshot.docs.forEach((doc) => setDocId(doc.id))
    );
  })();
  useEffect(
    () =>
      onSnapshot(currentPost, (snapshot) =>
        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            setCurrentLikes(change.doc.data().likesCounter);
            setCommentsArray(change.doc.data().comments);
            setLikedUsersArray(change.doc.data().likedUsers);
          }
        })
      ),
    []
  );
  return (
    <div className="post">
      <div className="postHeader">
        <img src={authorPfp}></img>
        <h3>{author}</h3>
      </div>
      <div className="postMain">
        <img src={img}></img>
        <div className="postInfo">
          <span onClick={() => handleLike(likedUsersArray, docId, setIcon)}>
            {currentLikes}
            <img id="likeIcon" className="icon" src={icon}></img>
          </span>
          <span>
            <img className="icon" src={commentIcon}></img>
          </span>
          <span>
            <img className="icon" src={shareIcon}></img>
          </span>
        </div>
        <div className="caption">
          <h4>{author} -</h4>
          <p>{caption}</p>
        </div>
      </div>
      <div className="postFooter">
        <h5>{commentsArray.length > 2 ? "View all comments" : null}</h5>
        <p>
          {commentsArray[0]
            ? `${commentsArray[0].commentAuthor} : ${commentsArray[0].comment}`
            : null}
        </p>
        <p>
          {commentsArray[1]
            ? `${commentsArray[1].commentAuthor} : ${commentsArray[1].comment}`
            : null}{" "}
        </p>
      </div>
    </div>
  );
}

export default Post;
