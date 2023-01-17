import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseBasics";
import { doc, getDoc } from "firebase/firestore";
import ErrorPage from "../ErrorPage";
function PostPage() {
  //set the post data to a non-meaningful string
  const [postData, setPostData] = useState("NULL");
  const { id } = useParams();
  const currentPost = doc(db, "Posts", id);
  useEffect(() => {
    getDoc(currentPost).then((post) => {
      if (post.exists) setPostData(post.data());
      else setPostData(undefined);
    });
  }, []);
  return (
    <>{postData ? <div className="postContainer"></div> : <ErrorPage />}</>
  );
}

export default PostPage;
