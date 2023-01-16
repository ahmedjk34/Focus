import React from "react";
import { UserInfo } from "firebase/auth";
import likeIcon from "../images/likeIcon.svg";
import commentIcon from "../images/commentIcon.svg";
import shareIcon from "../images/shareIcon.svg";
function Post({ data }) {
  const {
    author,
    authorpfp,
    caption,
    comments,
    date,
    id,
    img,
    likedUsers,
    likesCounter,
    url,
  } = data;
  return (
    <div className="post">
      <div className="postHeader">
        <img src={authorpfp}></img>
        <h3>{author}</h3>
      </div>
      <div className="postMain">
        <img src={img}></img>
        <div className="postInfo">
          <span>
            {likesCounter}
            <img className="icon" src={likeIcon}></img>
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
        <h5>Show all comments</h5>
        <p>
          {comments[0].commentAuthor} : {comments[0].comment}
        </p>
        <p>
          {comments[0].commentAuthor} : {comments[0].comment}
        </p>
      </div>
    </div>
  );
}

export default Post;
