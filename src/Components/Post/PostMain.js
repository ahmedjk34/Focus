import React, { useEffect, useState } from "react";
import { UserInfo } from "firebase/auth";
import likeIcon from "../images/likeIcon.svg";
import shareIcon from "../images/shareIcon.svg";
import { getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { postsRef } from "../../firebaseBasics";
import { addComment } from "./postFunctionality";
import { handleLike } from "./postFunctionality";
function PostMain({ data }) {
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
  const [newComment, setNewComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
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
        <div className="authorInfo">
          <img src={authorPfp}></img>
          <h3>@{author}</h3>
        </div>
        <div className="caption">
          <p>{caption}</p>
        </div>
      </div>
      <div className="postMain">
        <img src={img}></img>
      </div>
      <div className="postFooter">
        <div className="comments">
          {commentsArray.map((com, key) => {
            const { commentAuthor, authorpfp, comment } = com;
            return (
              <div className="comment" key={key}>
                <img src={authorpfp}></img>
                <h3>
                  {commentAuthor} : {comment}
                </h3>
              </div>
            );
          })}
        </div>
        <div className="addCommentContainer">
          <input
            id="addComment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              if (e.target.value == "") setIsDisabled(true);
              else setIsDisabled(false);
            }}
            placeholder="Add a comment"
          ></input>
          <button
            disabled={isDisabled}
            onClick={(e) => {
              e.preventDefault();
              addComment(newComment, docId);
              setNewComment("");
              setIsDisabled(true);
            }}
          >
            Post
          </button>
        </div>

        <div className="postInfo">
          <span>
            {currentLikes}
            <img
              id="likeIcon"
              className="icon"
              src={icon}
              onClick={() => handleLike(likedUsersArray, docId, setIcon)}
            ></img>
          </span>

          <span>
            <img className="icon" src={shareIcon}></img>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostMain;
