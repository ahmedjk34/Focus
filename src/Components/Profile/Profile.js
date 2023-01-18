import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, postsRef, usersRef } from "../../firebaseBasics";
import ErrorPage from "../ErrorPage";
import Post from "../Post/Post";

function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);
  const [followersArray, setFollowersArray] = useState([]);
  const [showPage, setShowPage] = useState(false);
  useEffect(() => {
    const userQ = query(usersRef, where("username", "==", username));
    const postsQ = query(postsRef, where("author", "==", username));
    onSnapshot(userQ, (snapshot) => {
      snapshot.docs.forEach((doc) =>
        setUserInfo((prev) => [...prev, doc.data()])
      );
    });
    onSnapshot(postsQ, (snapshot) => {
      snapshot.docs.forEach((doc) =>
        setUserPosts((prev) => [...prev, doc.data()])
      );
    });
  }, []);
  if (!auth.currentUser) return <ErrorPage />;
  return (
    <div className="profile">
      <div className="profileInfo"></div>
      <div className="postsSection"></div>
    </div>
  );
}

export default Profile;
