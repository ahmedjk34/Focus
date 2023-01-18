import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebaseBasics";
import { doc, getDoc } from "firebase/firestore";
import PostMain from "./PostMain";
import ErrorPage from "../ErrorPage";
import loading from "../images/loading.gif";
import Nav from "../Main/Nav";
function PostPage() {
  const [postData, setPostData] = useState("");
  const [showPage, setShowPage] = useState(false);
  const { id } = useParams();
  const currentPost = doc(db, "Posts", id);
  useEffect(() => {
    getDoc(currentPost).then((post) => {
      document.querySelector(".loadingPage").style.display = "none";
      setShowPage(true);
      if (post.exists) setPostData(post.data());
    });
  }, []);
  //If the user isn't signed in
  if (!auth.currentUser) return <ErrorPage></ErrorPage>;
  return (
    <div className="main">
      <img className="loadingPage" src={loading}></img>
      {showPage && <Nav></Nav>}
      {showPage &&
        (postData ? (
          <div className="postContainer">
            <PostMain data={postData}></PostMain>
          </div>
        ) : (
          <ErrorPage />
        ))}
    </div>
  );
}

export default PostPage;
