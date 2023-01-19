import {
  arrayRemove,
  arrayUnion,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, postsRef, usersRef } from "../../firebaseBasics";
import ErrorPage from "../ErrorPage";
import loading from "../images/loading.gif";
import Nav from "../Main/Nav";
import likeIcon from "../images/likeIcon.svg";
import commentIcon from "../images/commentIcon.svg";
import FollowersPopUp from "./FollowersPopUp";
import FollowingPopUp from "./FollowingPopUp";
import handelFollow from "./profileLogic";
function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);
  const [followersArray, setFollowersArray] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [doesFollow, setDoesFollow] = useState(false);
  const [showFollowersPopUp, setShowFollowersPopUp] = useState(false);
  const [showFollowingPopUp, setShowFollowingPopUp] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userQ = query(usersRef, where("username", "==", username));
    const postsQ = query(postsRef, where("author", "==", username));
    onSnapshot(userQ, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserId(doc.id);
        setUserInfo(doc.data());
        setFollowersArray(doc.data().followers);
        setFollowingArray(doc.data().following);
        //incase the array is empty (forEach wont work)
        if (doc.data().followers.length == 0) setDoesFollow(false);
        doc.data().followers.forEach((follower) => {
          setDoesFollow(false);
          if (follower.username === auth.currentUser.displayName)
            setDoesFollow(true);
        });
      });
    });
    onSnapshot(postsQ, (snapshot) => {
      snapshot.docChanges().forEach((doc) => {
        setUserPosts((prev) => [...prev, doc.doc.data()]);
        document.querySelector(".loadingPage").style.display = "none";
        setShowPage(true);
        document.querySelector(".loadingPage").style.display = "none";
        setShowPage(true);
      });
    });
  }, []);
  //MAKE SURE TO DELETE RAMA
  if (!auth.currentUser && showPage) return <ErrorPage />;
  return (
    <div className="profile">
      <img className="loadingPage" src={loading}></img>
      {showPage && (
        <>
          {showFollowersPopUp && (
            <FollowersPopUp
              followers={followersArray}
              close={() => setShowFollowersPopUp(false)}
            ></FollowersPopUp>
          )}
          {showFollowingPopUp && (
            <FollowingPopUp
              following={followingArray}
              close={() => setShowFollowingPopUp(false)}
            ></FollowingPopUp>
          )}
          <Nav></Nav>
          <div className="profileInfo">
            {doesFollow ? (
              <button
                onClick={(e) => handelFollow(userInfo, userId)}
                className="following"
              >
                Following -
              </button>
            ) : (
              <button
                onClick={(e) => handelFollow(userInfo, userId)}
                className="follow"
              >
                Follow +
              </button>
            )}
            <img src={userInfo.profilePicture}></img>
            <h3>@{userInfo.username}</h3>
            <div className="mainInfo">
              <h4 onClick={(e) => setShowFollowersPopUp(true)}>
                Followers : {userInfo.followers.length}
              </h4>
              <h4 onClick={(e) => setShowFollowingPopUp(true)}>
                Following : {userInfo.following.length}
              </h4>
              <h4>Posts : {userPosts.length}</h4>
            </div>
          </div>
          <div className="postsSectionHolder">
            <div className="postsSection">
              {userPosts.map((post) => (
                <div className="post">
                  <img src={post.img}></img>
                  <div className="postOverlay">
                    <span>
                      {post.likesCounter}{" "}
                      <img src={likeIcon} className="icon"></img>
                    </span>
                    <span>
                      <img src={commentIcon} className="icon"></img>
                      {post.comments.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
