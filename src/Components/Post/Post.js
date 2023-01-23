import React, { useEffect, useState } from "react";
import { UserInfo } from "firebase/auth";
import likeIcon from "../images/likeIcon.svg";
import likedIcon from "../images/likedIcon.svg";
import commentIcon from "../images/commentIcon.svg";
import shareIcon from "../images/shareIcon.svg";
import { getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, postsRef } from "../../firebaseBasics";
import { handleLike } from "./postFunctionality";
import { useNavigate } from "react-router-dom";
import CopyUrl from "./CopyUrl";
function Post({ data }) {
  //To-do : delete url from firebase & all functions
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
  const [isLiked, setIsLiked] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const navigation = useNavigate();
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
          setIsLiked(false);
          setCurrentLikes(change.doc.data().likesCounter);
          setCommentsArray(change.doc.data().comments);
          setLikedUsersArray(change.doc.data().likedUsers);
          change.doc.data().likedUsers.forEach((user) => {
            if (user === auth.currentUser.displayName) setIsLiked(true);
          });
        })
      ),
    []
  );
  return (
    <div className="post">
      <div className="postHeader">
        <img
          src={authorPfp}
          onClick={(e) => navigation(`/profile/${author}`)}
        ></img>
        <h3 onClick={(e) => navigation(`/profile/${author}`)}>{author}</h3>
      </div>
      <div className="postMain">
        <img src={img}></img>
        <div className="postInfo">
          <span>
            {currentLikes}
            <img
              id="likeIcon"
              className="icon"
              src={isLiked ? likedIcon : likeIcon}
              onClick={() => handleLike(likedUsersArray, docId)}
            ></img>
          </span>
          <span>
            <img
              className="icon"
              src={commentIcon}
              onClick={(e) => navigation(`/post/${docId}`)}
            ></img>
          </span>
          <span>
            <img
              className="icon"
              src={shareIcon}
              onClick={(e) => setShowCopy(true)}
            ></img>
          </span>
          {showCopy && (
            <CopyUrl id={docId} close={(e) => setShowCopy(false)}></CopyUrl>
          )}
        </div>
        <div className="caption">
          <h4>{author} -</h4>
          <p>{caption}</p>
        </div>
      </div>
      <div className="postFooter">
        {commentsArray.length > 2 ? (
          <h5 onClick={(e) => navigation(`/post/${docId}`)}>
            View all comments
          </h5>
        ) : null}
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
